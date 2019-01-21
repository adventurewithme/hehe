// var listfont = document.getElementById("parent").getElementsByTagName("p");
// var listimg = document.getElementById("parent").getElementsByTagName("img");
// var listli = document.getElementById("parent").children;

// for (var i = 0; i < listli.length; i++) {
//     listli[i].index = i;
//     listli[i].onclick = function (i) {
//         // initimg();//初始化img
//         initfont(listli.length);//初始化font
//         // switchImg(this.index);//改变图片
//         listfont[this.index].className = "f24";//改变font
//         panduan(this.index);
//     };
// };

// // function initimg() {
// //     listimg[0].setAttribute("src", "./img/home.png");
// //     listimg[1].setAttribute("src", "./img/service.png");
// //     listimg[2].setAttribute("src", "./img/profile.png");
// // }

// function initfont(index) {
//     for (var i = 0; i < index; i++) {
//         listfont[i].className = "f24grey";
//     }
// }

// function switchImg(index) {
//     switch (index) {
//         case 0:
//             listimg[0].setAttribute("src", "./img/home_selected.png");
//             break;
//         case 1:
//             listimg[1].setAttribute("src", "./img/service_selected.png");
//             break;
//         case 2:
//             listimg[2].setAttribute("src", "./img/profile_selected.png");
//             break;
//     }
// }
// function panduan(index) {
//     switch (index) {
//         case 0:
//             window.location.href = "index.html"
//             break;
//         case 1:
//             window.location.href = "service.html"
//             break;
//         case 2:
//             window.location.href = "mine.html"
//             break;
//     }
// }
$(function(){
    var login=window.localStorage.getItem('login_e');
    console.log(login,'common login')
    if (!login) {
        $('#parent li:last-child').click(function(){
            console.log('ddd')
            window.location.href ='login.html';
        })
    } else {
        $('#parent li:last-child').click(function () {
            console.log('ddd')
            window.location.href = 'mine.html';
        })
        // $('#parent li:last-child').click(function () {
        //     window.location.href = 'login.html';
        // })
        // window.location.href = 'login.html';
        // $('#parent li:last-child').addClass('hide');
    }
})