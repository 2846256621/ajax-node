const submit = document.getElementById("submit");
submit.onclick = function () {
    let name = document.getElementsByClassName("name")[0];
    let content = document.getElementsByClassName("content")[0];
    $.ajax({
        type:'GET',
        url:'/add',
        data:{
            name:name.value,
            content:content.value
        },
        success:function () {
            console.log('ok');
           window.location.href ="http://localhost:8080/index";
        }
    })
};