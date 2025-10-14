'use strict';

const fs = require("fs");
console.log("Program started");
fs.readFile("../../files/example1.txt", "utf8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
console.log("Program ended");