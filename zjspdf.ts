// import jsPDF from 'jspdf'
// import QRCode from 'qrcode'

// 在前端生成自定义 PDF 文件，可以通过多种方法完成，取决于你的具体需求和应用场景。下面列出了几种常用的实现方式：
// 1. 使用 jspdf 库
// jsPDF 是一个用于生成 PDF 文件的客户端 JavaScript 库。它允许你在客户端动态创建 PDF 文件，包括添加文本、图片、向量图形等。
// 安装：
// bash
// Copy
// npm install jspdf
// 示例代码：
// javascript
// Copy
// import jsPDF from 'jspdf';

// // 创建 PDF 实例
// const doc = new jsPDF();

// // 添加文本到 PDF
// doc.text('Hello world!', 10, 10);
// doc.text('This is client-side Javascript, pumping out a PDF.', 10, 20);

// // 保存 PDF 文件
// doc.save('document.pdf');
// 2. 使用 pdfmake 库
// pdfmake 也是一个功能强大的客户端 PDF 生成库，它提供了更复杂的布局和样式选项。
// 安装：
// bash
// Copy
// npm install pdfmake
// 示例代码：
// javascript
// Copy
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const docDefinition = {
//     content: [
//         { text: 'Heading', fontSize: 25 },
//         'Text content here...',
//         {
//             image: 'data:image/jpeg;base64,...', // 支持 Base64 编码的图片
//             width: 150
//         }
//     ]
// };

// pdfMake.createPdf(docDefinition).download('document.pdf');
// 3. 结合后端服务
// 对于更复杂或高质量的 PDF 生成需求（如涉及复杂布局、大量数据渲染），可能需要将数据发送到服务器端，并利用服务器端的库（如 Python 的 ReportLab 或 Node.js 的 PDFKit）来生成 PDF，然后将生成的 PDF 文件返回给客户端进行下载。
// 服务端（示例使用 Node.js 的 PDFKit）：
// javascript
// Copy
// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// const doc = new PDFDocument();
// doc.pipe(fs.createWriteStream('document.pdf'));

// doc.fontSize(25).text('Some text with an embedded font!', 100, 100);

// // Finalize PDF file
// doc.end();
// 客户端发送数据到服务器，服务器生成 PDF 并返回文件或文件链接给客户端。
// 总结
// 选择哪种方法取决于具体的项目需求。对于简单的需求，jsPDF 或 pdfmake 可能已经足够。如果需求非常复杂，或者你的应用已经包括了服务端组件，可能使用服务器端生成 PDF 的方式更合适。不管哪种方式，都能够在客户端生成并提供自定义的 PDF 文件。

// async function generatePDFWithQR() {
//   // 创建一个新的 PDF 文档
//   const doc = new jsPDF()

//   // 生成二维码
//   const qrDataUri = await QRCode.toDataURL('https://example.com', { margin: 1 })

//   // 将二维码绘制到 PDF 中
//   // 注意：此处的二维码数据 URI 形式是字符串，以 "data:image/png;base64," 开头
//   // 参数分别代表：图片内容、格式、x坐标、y坐标、宽度、高度
//   doc.addImage(qrDataUri, 'PNG', 10, 10, 50, 50)

//   // 保存 PDF
//   doc.save('document-with-qr.pdf')
// }

// generatePDFWithQR()
