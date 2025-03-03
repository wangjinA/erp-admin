import * as XLSX from 'xlsx';
export function getExcleData(file): Promise<any[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const data = new Uint8Array(e.target.result as any);
      const workbook = XLSX.read(data, { type: 'array' });
      resolve(
        workbook.SheetNames.map((item) =>
          XLSX.utils.sheet_to_json(workbook.Sheets[item], { header: 1 })
        ).flat(1) as any
      );
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function exportToExcel(
  data: any[][],
  fileName: string,
  columnWidths: any[] = []
) {
  // 创建工作簿
  const workbook = XLSX.utils.book_new();
  // 创建工作表
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  worksheet['!cols'] = columnWidths;

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  // 生成Excel文件的二进制数据
  const excelData = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  // 创建Blob对象
  const blob = new Blob([excelData], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  // 创建下载链接
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  link.click();
}
