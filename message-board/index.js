const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const url = require('url');

http.createServer(function (req,res){
   req.method = req.method.toLowerCase();
   //首页
  if(req.url === "/index" || req.url === "/"){
      fs.readFile(path.join(__dirname,'public' ,'index.html'),function (err,data) {
          if(err){
              res.end("Not Found 404");
          }
          else
          {
              res.setHeader('Content-Type',mime.getType(path.join(__dirname,'public',req.url))); //getType方法得到 对应的Content-Type的类型
              res.end(data);
          }
      })
  }
  //留言板
  else if(req.url === '/goto'){
      fs.readFile(path.join(__dirname,'public' ,'goto.html'),function (err,data) {
          if(err){
              res.end("Not Found 404");
          }
          else{
              res.setHeader('Content-Type',mime.getType(path.join(__dirname,'public',req.url))); //getType方法得到 对应的Content-Type的类型
              res.end(data);
          }

      })
  }
  else if(req.url.startsWith("/css")) {
      fs.readFile(path.join(__dirname,'/public',req.url), function (err, data) {
          if (err) {
              res.end("Not Found 404");
          }
          else {
              res.setHeader('Content-Type', mime.getType(req.url));
              res.end(data);
          }
      })
  }
  else if(req.url.startsWith("/image")) {
      fs.readFile(path.join(__dirname,'/public',req.url), function (err, data) {
          if (err) {
              res.end("Not Found 404");
          }
          else {
              res.setHeader('Content-Type', mime.getType(req.url));
              res.end(data);
          }
      })
  }
  else if(req.url.startsWith("/javaScript")) {
      fs.readFile(path.join(__dirname,'/public',req.url), function (err, data) {
          if (err) {
              res.end("Not Found 404");
          }
          else {
              res.setHeader('Content-Type', mime.getType(req.url));
              res.end(data);
          }
      })
  }
  //添加后数据写入文件
  else if(req.url.startsWith("/add") && req.method === 'get'){
      let urlObj = url.parse(req.url,true);
      fs.readFile(path.join(__dirname,"public","data.json"),function (err,data) {
         if(err) throw err;
         data = JSON.parse(data);
         data.push(urlObj.query);
          fs.writeFile(path.join(__dirname,"public","data.json"), JSON.stringify(data),function (err) {
              if(err) throw err;
              res.statusCode = 302;
              res.setHeader('location','/');
              // res.writeHead(302,{'location':'http://localhost:8080/'}); //重定向
              res.end();
          });
      });

  }
  //首页读取数据
  else if(req.url.startsWith("/more") && req.method === 'get'){
      fs.readFile(path.join(__dirname,"public","data.json"), 'utf-8',function (err,data) {
          if(err) throw err;
          res.end(data);
      });
  }
  else{
      res.end("Not Found");
    }
}).listen(8080,function () {
   console.log("http://localhost:8080");
});