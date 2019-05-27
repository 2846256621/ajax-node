
/** 方法1：
 * 原生 js
 * 1.如例：点击按钮 发送请求
 * 2. 创建ajax
 *    基本内容如下：
 *       创建连接 XMLHttpRequest 的一个实例
 *       设置请求的路径 url
 *       设置请求的数据  类型最好是json
 * 3.连接服务器
 *       open()方法  3个参数  请求方法 请求的路由  同/异步
 *       post方法 得设置请求报文头  便于解析
 * 4.发送数据
 *       send(data) 发送数据  参数类型是字符串
 * 5.接收响应
 *       判断请求是否成功  通过 状态值 和 状态码
 *       成功  则进行成功需要的操作
 *
 * 6.后台响应的数据 是 req.responseText
 *
 * 7.数据类型的统一：
 *   前端发送的数据是字符串  后台响应的也是字符串
 *   要掌握JSON.parse() 和 JSON.stringify()方法  进行相互转化
 *
 *
 * */

//1.原生js ajax
let btn = document.getElementById("btn");
//点击 按钮 发出ajax请求
btn.onclick = function() {
    //1.创建连接
    let req = new XMLHttpRequest();
    //前端发送给后台的数据
    let data = {
        "content": "我是页面post发送的数据"
    };
    //请求的路由（路径）
    let url = "http://localhost:8080/add";
    //2.连接服务器
    req.open('post', url, true);
    //POST方式，必须加入如下头信息设定
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (req) {
        //3.发送数据
        req.send(JSON.stringify(data));
        //4.接收响应
        req.onreadystatechange = function () {
            //请求成功
            if (req.readyState === 4 && req.status === 200) {
                //后台响应的数据 req.responseText 200
                success(req.responseText);
            }
        };
    }
};
//请求成功后的操作  创建新元素  再添加到页面中
function success(data) {
    data = JSON.parse(data);
    let add = document.getElementById("add");
    let create_new = document.createElement("div");
    create_new.innerText = data.name;
    add.appendChild(create_new);
}

/**方法2：
 * jquery ajax
 * 1.引入jquery的包
 * 2.如例点击get按钮  发送请求
 * 3.写ajax请求
 *   请求基础包括：
 *        请求类型type --> get/post
 *        响应的数据类型  json
 *        请求的路径  url
 *        需要发送给后台的数据  data  类型最好是json
 *        请求成功之后的操作
 *          如下：新创建一个结点 添加到父元素中
 *
 * 4.后台响应的数据是：success方法的参数 res_data
 *
 * 5.数据类型的统一
 *    get方法 ： 数据跟在 url 后面  是字符串  无需管发送数据的类型
 *              若设置dataType:json 则响应的数据类型也是json 无需转换
 *    post方法： 适用于数据比较多 后台也是一段一段接收数据
 *              发送数据的类型是字符串  后台需要转换成json
 *              后台响应的数据也是字符串  前端也需要转换成json
 * */


let btn2 = document.getElementById("btn2");
btn2.onclick = function () {
    $.ajax({
        type: 'GET',
        dataType: 'json',  //响应的数据形式是json 所以不需要转换
        data: {"content": "我是页面get发送的数据"},
        url: "http://localhost:8080/add",
        success: function (res_data) {
            //请求成功后的操作  创建新元素  再添加到页面中
            let add = document.getElementById("add");
            let create_new = document.createElement("div");
            create_new.innerText = res_data.add_content;
            add.appendChild(create_new);
        }
    })
};

/**
 * 应用：文件读取数据
 *      get 方法 发送请求 因为不发送数据 get适合
 *      读取到的数据循环添加到页面中
 *      后台需要从文件中读取数据
 * */

let btn3 = document.getElementById("btn3");
let stu_table = document.querySelector("#stu_table tbody");
btn3.onclick = function () {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url:"http://localhost:8080/more",
        success:function (data) {
            for(let i= 0;i<data.length;i++){
                stu_table.innerHTML += `<tr>
                             <td>${data[i].id}</td>
                             <td>${data[i].name}</td>
                             <td>${data[i].sex}</td>
                             <td>${data[i].age}</td>
                             <td>${data[i].hobby}</td>
                             <td>${data[i].img}</td>
                    </tr>`
            }

        }
    })
};