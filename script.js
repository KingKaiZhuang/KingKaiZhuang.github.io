// 右側選單點擊時
let collapseBtns = document.querySelectorAll('.collapse-btn');
for (collapseBtn of collapseBtns) {
    collapseBtn.onclick = e => {
        let panel = e.target.nextElementSibling;
        e.target.classList.toggle('active');
        panel.classList.toggle('active');
        console.log(panel.style.width);
        if (panel.style.width) {
            panel.style.width = null;
        } else {
            panel.style.width = 250 + 'px';
        }
        document.querySelector('.side-menu').style.transform = 'translateX(-100%)';
        document.querySelector('#side-menu-switch').checked = false;
        e.preventDefault();
    }
}
let menusides = document.querySelectorAll('#side-menu-switch');
// 左側選單點擊時
$(function () {
    $('#side-menu-btn').click(function () {
        $('.side-menu').css('transform', '');
        $('.menu-right').css('width', '');
        $('.nav-toggle.active').removeClass('active');
    });
})

//  圖片輪播 
$(function () {
    $('#product').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplaySpeed: 500,
        nav: true,
        navText: [],
        dots: true,
        dotsText: []
    })
})

// top 按鈕
$(function () {
    $(window).scroll(function () {
        let animateFadeIn = 'fadeInUp';
        let animateFadeOut = 'fadeOutRight';
        let h = $(window).scrollTop();
        // console.log(h);
        if (h > 600) {
            $('.gotop').removeClass(animateFadeOut);
            $('.gotop').addClass(animateFadeIn);
        } else {
            $('.gotop').removeClass(animateFadeIn);
            $('.gotop').addClass(animateFadeOut);
        }
    })
})

//  Messenger 洽談外掛程式 Code 
var chatbox = document.getElementById('fb-customer-chat');
chatbox.setAttribute("page_id", "108229789013230");
chatbox.setAttribute("attribution", "biz_inbox");

window.fbAsyncInit = function () {
    FB.init({
        xfbml: true,
        version: 'v17.0'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/zh_TW/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// wow 特效
new WOW().init();