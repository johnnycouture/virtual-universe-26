import { readFileSync } from "node:fs";

const word = process.argv[2];
if (!word) {
  console.error("Usage: npm run search -- <word>");
  process.exit(1);
}

const file = new URL("./notes/keynote-highlights.json", import.meta.url);
const { highlights } = JSON.parse(readFileSync(file, "utf8"));

const needle = word.toLowerCase();
const matches = highlights.filter(
  ({ title, summary }) =>
    title.toLowerCase().includes(needle) ||
    summary.toLowerCase().includes(needle),
);

if (matches.length === 0) {
  console.log(`No highlights match "${word}".`);
} else {
  for (const { title, summary } of matches) {
    console.log(`${title}\n  ${summary}`);
  }
}
