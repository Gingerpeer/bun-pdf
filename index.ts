import { pdfToText, pdfToPages } from 'pdf-ts';

const pdf = Bun.file('./pdf/Resume P. D. van Zyl.pdf');
const arrayBuffer = await pdf.arrayBuffer();
const normalBuffer = await Buffer.from(arrayBuffer);
const text = await pdfToText(normalBuffer);
const pages = await pdfToPages(normalBuffer);

console.log(pages.map((page)=> page.text.replaceAll('\n', ' ')));


