$(function() {
    let menu = $("#menu-icon");
    let navbar = $(".navbar");

    menu.click(() => {
        menu.toggleClass('bx-x'); // 使用 jQuery 的 toggleClass 方法
        navbar.toggleClass('open'); // 使用 jQuery 的 toggleClass 方法
    });
});
