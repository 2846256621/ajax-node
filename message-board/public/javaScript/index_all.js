$(function () {
    $.ajax({
        type:'GET',
        dataType:'json',
        url:'/more',
        success:function (data) {
            console.log(data);
            let ul = document.getElementsByTagName('ul')[0];
            for(let i=0;i<data.length;i++){
                ul.innerHTML += `
                <li>${data[i].content}</li>
                `
            }

        }
    })
});