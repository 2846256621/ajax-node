const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
http.createServer(function (request,response) {
    //得到public的完整路径
    let publicURL = path.join(__dirname,'public');
    //得到public下请求的具体完整绝对路径
    let filename = path.join(publicURL,request.url);
    //url只是一个标识符，帮助服务器响应不同的文件资源
    //读取响应内容 不需要设置编码形式，因为种类很多
    fs.readFile(filename,function (err,data) {
       if(err){
           response.end("文件不存在");
       }
       else{
           /** mime模块
            * 可以通过第三方的工具mime模块来判断每次请求的不同资源
            * 对应的Content-Type的类型
             */
           response.setHeader('Content-Type',mime.getType(filename)); //getType方法得到 对应的Content-Type的类型
           //找到文件则返回文件资源
           response.end(data);
       }

    })
}).listen(8080,function () {
   console.log("http://localhost:8080");
});