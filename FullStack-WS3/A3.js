import { readFile, writeFile, appendFile } from "fs/promises";

const a = await readFile("./files/example1.txt", "utf8");
const b = await readFile("./files/example2.txt", "utf8");

// combine
await writeFile("./files/combined.txt", a + "\n" + b, "utf8");

// prepend
const current = await readFile("./files/combined.txt", "utf8");
await writeFile("./files/combined.txt", "TOP TEXT\n" + current, "utf8");

// append
await appendFile("./files/combined.txt", "\nEND TEXT\n", "utf8");
console.log("Done. See files/combined.txt");