'use strict';

// programB.js
const fs = require('fs');
console.log("1. Taking the customer's order.");

// The waiter now waits at the kitchen window... blocking everything.
const data = fs.readFileSync('example.txt', 'utf8');

console.log("2. Food is ready! Here is the file content:", data);
console.log("3. FINALLY, I can serve other tables.");
console.log("4. Refilling drinks for another customer.");
