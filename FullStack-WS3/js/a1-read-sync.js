'use strict';

const fs = require("fs");
console.log("Program started");
const text = fs.readFileSync("../files/example1.txt", "utf8");
console.log(text);
console.log("Program ended");