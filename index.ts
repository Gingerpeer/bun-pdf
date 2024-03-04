import { /* pdfToText , */ pdfToPages } from 'pdf-ts';

const pdf = Bun.file('./pdf/Resume P. D. van Zyl.pdf');
const arrayBuffer = await pdf.arrayBuffer();
const normalBuffer = await Buffer.from(arrayBuffer);
const pages = await pdfToPages(normalBuffer);

const textArray: string[] | undefined = [];

pages.map((page)=> textArray.push(page.text.replaceAll('\n', ' ').replaceAll('  ', ' ')));

console.log(textArray);


