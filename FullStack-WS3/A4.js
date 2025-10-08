const fs = require("fs");
const dir = "./new-data";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);
const file = dir + "/note.txt";
if (!fs.existsSync(file)) fs.writeFileSync(file, "Hello from WS-3!");
console.log("Ready.");
// To test delete, uncomment:
// fs.unlinkSync("./files/combined.txt"); console.log("Deleted combined.txt");