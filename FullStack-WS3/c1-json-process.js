const http = require("http");
const fs = require("fs");

let data = JSON.parse(fs.readFileSync("./data.json","utf8"));
data.push({ name:"John Doe", company:"Initrode", address:"3 River Rd" });
console.table(data);
data.pop();

const server = http.createServer((req,res)=>{
  if(req.url==="/table"){
    const rows = data.map(d =>
      `\x3Ctr\x3E\x3Ctd\x3E${d.name}\x3C/td\x3E\x3Ctd\x3E${d.company}\x3C/td\x3E\x3Ctd\x3E${d.address}\x3C/td\x3E\x3C/tr\x3E`
    ).join("");

    const html =
      `\x3Ctable border="1" cellpadding="6"\x3E` +
        `\x3Ctr\x3E\x3Cth\x3EName\x3C/th\x3E\x3Cth\x3ECompany\x3C/th\x3E\x3Cth\x3EAddress\x3C/th\x3E\x3C/tr\x3E` +
        rows +
      `\x3C/table\x3E`;

    res.writeHead(200,{"Content-Type":"text/html"});
    return res.end(html);
  }
  res.writeHead(200,{"Content-Type":"text/plain"});
  res.end("Go to /table");
});

server.listen(3001,()=>console.log("JSON view on http://localhost:3001/table"));