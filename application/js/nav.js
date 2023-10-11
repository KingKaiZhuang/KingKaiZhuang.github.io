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
});
