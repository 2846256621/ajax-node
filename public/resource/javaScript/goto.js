const submit = document.getElementById("submit");
submit.onclick = function () {

    let name = document.getElementsByClassName("name")[0];
    let content = document.getElementsByClassName("content")[0];
    if(name.value === "" && content.value !== ""){
        alert("姓名不能为空，请重新输入");
    } else if(content.value === ""&& name.value !== ""){
        alert("留言内容不能为空，请重新输入");
    }else if(name.value === ""&& content.value === ""){
        alert("内容不能为空，请重新输入");
    }
    if(name.value !== ""&& content.value !== ""){
        $.ajax({
            type:'GET',
            url:'/add',
            data:{
                name:name.value,
                content:content.value
            },
            success:function () {
                window.location.href ="http://localhost:8080/index";
            }
        })
    }

};