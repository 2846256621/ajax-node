const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

http.createServer(function (request,response) {
    //post方法
    if(request.url === '/add' && request.method === 'POST'){
        let array = [];
        // 每当收到一段提交的数据，该方法会执行一次
        request.on('data', function (chunk) {
            array.push(chunk); // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
        });
        request.on('end', function () {
            let postSum = Buffer.concat(array);
            postSum = postSum.toString('utf8');
            postSum = JSON.parse(postSum);
            console.log(postSum);

            // //设置后台响应的数据
            let res_data = {
                "add_content":"post方法：我是后台响应回来的数据",
                "name":"王炸"
            };
            response.writeHead(200, {'Access-Control-Allow-Origin': 'http://localhost:63342'}); //跨域
            response.end(JSON.stringify(res_data));
        })
    }
    //get方法
    else if(request.url.startsWith('/add') && request.method === 'GET'){
        //解析url里面的数据
        let urlObj = url.parse(request.url,true);
        // console.log(urlObj); //输出所有数据
        let req_data = urlObj.query; //需要的数据
        console.log(req_data); //输出页面发送的数据

        //设置后台响应的数据
        let res_data = {
            "add_content":"get方法：我是后台响应回来的数据"
        };
        response.writeHead(200,{'Access-Control-Allow-Origin': 'http://localhost:63342' });//跨域
        response.end(JSON.stringify(res_data));
    }
    //文件读取
    else if(request.url.startsWith('/more') && request.method === 'GET'){
        fs.readFile(path.join(__dirname,'data.json'),'utf-8',function (err,data) {
            if(err)
                throw err;
            response.writeHead(200,{'Access-Control-Allow-Origin': 'http://localhost:63342' });//跨域
            // console.log(data); //读取到的文件内容
            response.end(data);
        })
    }

}).listen(8080,function () {
   console.log('http://localhost:8080');
});