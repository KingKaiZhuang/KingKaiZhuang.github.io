$(function() {
    let navToggle = ".nav-toggle";
    let nav = $("nav");
    let navList = $("nav ul li");
    let isFullHeight = false;
    
    $(navToggle).click(()=>{
        if(isFullHeight){
            nav.css("height","60px");
            navList.css("display","none");
            isFullHeight = false;
        }else{
            nav.css("height","100vh");
            navList.css("display","block");
            isFullHeight = true;
        }
    })

    $(window).resize(() => {
        const screenWidth = window.innerWidth;
        if(screenWidth > 910) nav.css("height","60px");
        console.log(screenWidth);
    });

    let lastScrollTop = 0;

    $(window).scroll(() => {
        let scrollTop = $(this).scrollTop();
    
        if (scrollTop > lastScrollTop && scrollTop > 60) {
            nav.fadeOut(300, function() {
                nav.css("display", "none");
            });
        } else {
            nav.fadeIn(300, function() {
                nav.css("display", "flex");
            });
        }
    
        lastScrollTop = scrollTop;
    });
    
});
