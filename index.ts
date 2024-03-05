import { /* pdfToText , */ pdfToPages } from 'pdf-ts';
import clipboard from 'clipboardy';
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: Bun?.env.openAi
// });

const fileName = 'ch5'

const pdf = Bun.file(`./pdf/${fileName}.pdf`);
const arrayBuffer = await pdf.arrayBuffer();
const normalBuffer = await Buffer.from(arrayBuffer);
const pages = await pdfToPages(normalBuffer);

const textArray: string[] | undefined = [];

pages.map((page)=> textArray.push(page.text.replaceAll('\n', '')));

// await navigator.clipboard.writeText(text);
copyToClipboard(textArray[1]);
console.log(textArray[1]);
async function copyToClipboard(text: string) {
  clipboard.writeSync(text);
  clipboard.readSync();
}
// await Bun.write(`./output/${fileName}.txt`, textArray.join("\n"));
// console.log(textArray);

// async function prompt() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }

// prompt()
