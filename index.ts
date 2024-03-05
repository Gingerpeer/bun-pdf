import { /* pdfToText , */ pdfToPages } from 'pdf-ts';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: Bun?.env.openAi
});

const fileName = 'Ch15_v02'

const pdf = Bun.file(`./pdf/${fileName}.pdf`);
const arrayBuffer = await pdf.arrayBuffer();
const normalBuffer = await Buffer.from(arrayBuffer);
const pages = await pdfToPages(normalBuffer);

const textArray: string[] | undefined = [];

pages.map((page)=> textArray.push(page.text.replaceAll('\n', '')));

await Bun.write(`./output/${fileName}.txt`, textArray.join("\n"));
// console.log(textArray);

async function prompt() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

// prompt()
