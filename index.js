const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const url = require('url');
const template = require('art-template');
http.createServer(function (req,res){
   req.method = req.method.toLowerCase();
   //首页 引入art-template 模板 去渲染页面内容
  if(req.url === "/index" || req.url === "/"){
      fs.readFile(path.join(__dirname,'public' ,'index.html'),function (err,data) {
          if(err){
              res.end("Not Found 404");
          }
          else
          {
              fs.readFile(path.join(__dirname,'public','data.json'),function (err,files) {
                  if(err) throw err;
                  let html = template.render(data.toString(),{
                      data:JSON.parse(files)
                  });
                  res.setHeader('Content-Type',mime.getType(path.join(__dirname,'public',req.url))); //getType方法得到 对应的Content-Type的类型
                  res.end(html);
              });

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
  //资源文件 css/image/javascript
  else if(req.url.startsWith("/resource")) {
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
              //重定向
              res.statusCode = 302;
              res.setHeader('location','/');
              res.end();
          });
      });

  }
  else{
      res.end("Not Found");
    }
}).listen(8080,function () {
   console.log("http://localhost:8080");
});