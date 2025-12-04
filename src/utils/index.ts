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
  columnWidths: any[] = [],
  format: 'xlsx' | 'xls' | 'xlsm' = 'xlsx'
) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  worksheet['!cols'] = columnWidths;
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 这里已经是对的：xls 用 biff8，其他用本身
  const bookType = format === 'xls' ? 'biff8' : format;

  const excelData = XLSX.write(workbook, {
    type: 'array',
    bookType: bookType as XLSX.BookType,
  });

  const mimeTypes = {
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xls: 'application/vnd.ms-excel',
    xlsm: 'application/vnd.ms-excel.sheet.macroEnabled.12', // ✅ 这个要这样
  } as const;

  const blob = new Blob([excelData], { type: mimeTypes[format] });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.${format}`;
  link.click();
}
