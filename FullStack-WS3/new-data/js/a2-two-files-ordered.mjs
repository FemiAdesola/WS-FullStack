import { readFile } from "fs/promises";
const one = await readFile("../../files/example1.txt", "utf8");
const two = await readFile("../../files/example2.txt", "utf8");
console.log(one);
console.log(two);