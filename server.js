
const http=require("http")
const fs =require("fs")
const os=require("os")
const port = 3000;

const server =http.createServer((req,res)=>{
  if(req.method==="GET" && req.url==="/updateuser"){
    const log=`Visited at ${new Date().toISOString()}\n`;
    fs.appendFile("visitors.log",log,(err)=>{
      if(err){
        res.writeHead(500);
        return res.end("error");
      }
      else{
        res.end("logged");
      }
    })
  }
  else if(req.method==="GET" && req.url==="/savelog"){
    fs.readFile("visitors.log","utf-8",(err,data)=>{
      if(err){
        res.writeHead(500);
        res.end("cannot save");
      }
      res.end(data);
    }    )
  }
  else if(req.method==="POST" && req.url==="/backup"){
    fs.readFile("visitors.log","utf-8",(err,data)=>{
      if(err){
      res.writeHead(500);
      res.end("cannot read log");
      }})
    
    fs.writeFile("backup.log",data,(err)=>{
      if(err){
        res.writeHead(500);
        res.end("cannot backend");
        return;
      }
      res.end("backend created");
    })
  }
  else if(req.method==="GET" && req.url==="/clearLog"){
    fs.writeFile("visitors.log","",(err)=>{
    if(err){
      res.writeHead(500);
      res.end("cannot clear log");
    }
    res.end("Log  ko clear kar diya ");
  })
  }
  else if(req.method==="GET" && req.url==="/serverInfo"){
    const serverInfo={
      hostname:os.hostname(),
      totalmemory:os.totalmem(),
      freememory:os.freemem()
    };
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(serverInfo));
  }
  else{
    res.end("no route found of this name");
  }
})
server.listen(port,()=>{
  console.log("server is running ar 3000");
})
  