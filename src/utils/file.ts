import dayjs from "dayjs";
import JSZip from "jszip";

export type ProgressCallback = (progress: {
  current: number,
  total: number,
  percentage: number,
  status: 'downloading' | 'completed' | 'failed',
  fileName: string,
  failed: number,
  downloading: number,
  errorMsg: string
}) => void;

/**
 * 批量下载PDF文件并打包成ZIP
 * @param {string[]} pdfUrls - PDF链接数组
 * @param {Function} progressCallback - 进度回调函数
 * @param {Object} options - 配置选项
 * @returns {Promise<Object>} 包含zipBlob和结果统计的对象
 */
export async function downloadPdfsToZip(pdfUrls, progressCallback: ProgressCallback, options: {
  concurrency?: number,
  zipName?: string,
  timeout?: number,
  retries?: number
} = {}) {
  const {
    zipName = `面单数据${dayjs().format('YYYY-MM-DD')}.zip`,
    concurrency = 5,
    timeout = 30000,
    retries = 2
  } = options;

  // 检查JSZip是否可用
  if (typeof JSZip === 'undefined') {
    throw new Error('JSZip库未加载，请引入JSZip CDN或安装依赖');
  }

  const zip = new JSZip();
  const totalFiles = pdfUrls.length;
  let completedFiles = 0;
  let failedFiles = 0;
  let currentlyDownloading = 0;

  // 进度回调
  const updateProgress = (status, fileName = '', errorMsg = '') => {
    const percentage = totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 0;
    progressCallback({
      current: completedFiles,
      total: totalFiles,
      percentage,
      status,
      fileName,
      failed: failedFiles,
      downloading: currentlyDownloading,
      errorMsg
    });
  };

  // 简单的并发控制（不依赖外部库）
  const createConcurrencyLimit = (limit) => {
    let running = 0;
    const queue = [];

    const run = async (fn) => {
      return new Promise((resolve, reject) => {
        queue.push({ fn, resolve, reject });
        process();
      });
    };

    const process = () => {
      if (running >= limit || queue.length === 0) return;
      
      running++;
      const { fn, resolve, reject } = queue.shift();
      
      fn().then(resolve).catch(reject).finally(() => {
        running--;
        process();
      });
    };

    return run;
  };

  const limiter = createConcurrencyLimit(concurrency);

  // 下载单个PDF文件
  const downloadPdf = async (url, index) => {
    return limiter(async () => {
      let lastError;
      
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          currentlyDownloading++;
          updateProgress('downloading', `文件 ${index + 1}/${totalFiles}`, 
            attempt > 0 ? `重试 ${attempt}/${retries}` : '');
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          const response = await fetch(url, {
            signal: controller.signal,
            method: 'GET',
            headers: {
              'Accept': 'application/pdf,*/*'
            },
            mode: 'cors' // 处理跨域
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const contentType = response.headers.get('content-type');
          if (contentType && !contentType.includes('pdf') && !contentType.includes('application/octet-stream')) {
            console.warn(`文件 ${index + 1} 可能不是PDF格式: ${contentType}`);
          }
          
          const arrayBuffer = await response.arrayBuffer();
          
          // 生成文件名
          let fileName = `document_${String(index + 1).padStart(4, '0')}.pdf`;
          try {
            const urlObj = new URL(url);
            const pathName = urlObj.pathname;
            const extractedName = pathName.split('/').pop();
            if (extractedName && (extractedName.toLowerCase().includes('.pdf') || extractedName.length > 0)) {
              fileName = extractedName.endsWith('.pdf') ? extractedName : `${extractedName}.pdf`;
            }
          } catch (e) {
            // 使用默认文件名
          }
          
          // 确保文件名唯一
          let finalFileName = fileName;
          let counter = 1;
          while (zip.files[finalFileName]) {
            const nameWithoutExt = fileName.replace(/\.pdf$/i, '');
            finalFileName = `${nameWithoutExt}_${counter}.pdf`;
            counter++;
          }
          
          zip.file(finalFileName, arrayBuffer);
          completedFiles++;
          currentlyDownloading--;
          updateProgress('completed', finalFileName);
          
          return { success: true, fileName: finalFileName, size: arrayBuffer.byteLength };
          
        } catch (error) {
          lastError = error;
          currentlyDownloading--;
          
          if (attempt === retries) {
            // 最后一次重试失败
            failedFiles++;
            completedFiles++;
            updateProgress('failed', `文件 ${index + 1}`, error.message);
            console.error(`下载失败 [${index + 1}/${totalFiles}]:`, url, error.message);
            return { success: false, error: error.message, url, index: index + 1 };
          } else {
            // 重试前等待一下
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          }
        }
      }
      
      return { success: false, error: lastError?.message || '未知错误', url, index: index + 1 };
    });
  };

  try {
    updateProgress('starting', '开始下载...');
    
    if (totalFiles === 0) {
      throw new Error('PDF链接数组为空');
    }
    
    // 并发下载所有PDF
    const downloadPromises = pdfUrls.map((url, index) => downloadPdf(url, index));
    const results = await Promise.all(downloadPromises);
    
    // 统计结果
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    if (successful.length === 0) {
      throw new Error('所有文件下载失败');
    }
    
    updateProgress('zipping', '正在压缩文件...');
    
    // 生成ZIP文件
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    }, (metadata) => {
      // ZIP生成进度
      const zipProgress = Math.round(metadata.percent);
      updateProgress('zipping', `压缩中... ${zipProgress}%`);
    });
    
    const totalSize = successful.reduce((sum, item) => sum + (item.size || 0), 0);
    
    updateProgress('finished', 
      `完成！成功: ${successful.length}, 失败: ${failed.length}, 总大小: ${formatBytes(totalSize)}`);
    
    const result = {
      zipBlob,
      results: {
        total: totalFiles,
        successful: successful.length,
        failed: failed.length,
        totalSize,
        zipSize: zipBlob.size,
        failedItems: failed,
        successfulItems: successful
      }
    };
    downloadZipFile(result.zipBlob, zipName);
    return result;
    
  } catch (error) {
    updateProgress('error', '处理失败', error.message);
    throw error;
  }
}

// 辅助函数：格式化文件大小
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 自动下载ZIP文件
export function downloadZipFile(zipBlob, fileName = 'pdfs.zip') {
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 使用示例
async function example() {
  const pdfUrls = [
    'https://example.com/file1.pdf',
    'https://example.com/file2.pdf',
    'https://example.com/file3.pdf',
    // ... 更多PDF链接
  ];
  
  // 创建进度显示元素
  const progressDiv = document.createElement('div');
  progressDiv.innerHTML = `
    <div style="margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
      <h3>PDF下载进度</h3>
      <div id="progress-bar" style="width: 100%; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden;">
        <div id="progress-fill" style="height: 100%; background: #4CAF50; width: 0%; transition: width 0.3s;"></div>
      </div>
      <div id="progress-text" style="margin-top: 10px;">准备开始...</div>
      <div id="progress-details" style="margin-top: 5px; font-size: 12px; color: #666;"></div>
    </div>
  `;
  document.body.appendChild(progressDiv);
  
  // 进度回调函数
  const progressCallback = (progress) => {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const progressDetails = document.getElementById('progress-details');
    
    if (progressFill) progressFill.style.width = `${progress.percentage}%`;
    if (progressText) progressText.textContent = 
      `${progress.percentage}% (${progress.current}/${progress.total}) - ${progress.status}`;
    
    let details = '';
    if (progress.fileName) details += `当前: ${progress.fileName}`;
    if (progress.failed > 0) details += ` | 失败: ${progress.failed}`;
    if (progress.downloading > 0) details += ` | 下载中: ${progress.downloading}`;
    if (progress.errorMsg) details += ` | ${progress.errorMsg}`;
    
    if (progressDetails) progressDetails.textContent = details;
  };
  
  try {
    console.log('开始下载PDF文件...');
    
    const result = await downloadPdfsToZip(pdfUrls, progressCallback, {
      concurrency: 3,     // 并发数，建议不要太高
      timeout: 60000,     // 60秒超时
      retries: 2          // 重试次数
    });
    
    console.log('下载完成:', result.results);
    
    // 自动下载ZIP文件
    downloadZipFile(result.zipBlob, 'my-pdfs.zip');
    
    // 显示结果
    alert(`下载完成！\n成功: ${result.results.successful}个\n失败: ${result.results.failed}个\nZIP大小: ${formatBytes(result.results.zipSize)}`);
    
  } catch (error) {
    console.error('处理失败:', error);
    alert('处理失败: ' + error.message);
  } finally {
    // 3秒后移除进度显示
    setTimeout(() => {
      if (progressDiv.parentNode) {
        progressDiv.parentNode.removeChild(progressDiv);
      }
    }, 3000);
  }
}


export async function createPdfBlobUrl(pdfUrl: string) {
  try {
    const response = await fetch(pdfUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    // 确保MIME类型为PDF
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
    
  } catch (error) {
    console.error('创建PDF Blob URL失败:', error);
    throw error;
  }
}