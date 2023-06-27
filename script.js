/* Callapse nav的收合*/
let collapseBtns = document.querySelectorAll('.collapse-btn');
for(collapseBtn of collapseBtns){
    collapseBtn.onclick = e => {
        let panel = e.target.nextElementSibling;
        e.target.classList.toggle('active');
        panel.classList.toggle('active');
        console.log(panel.style.height);
        if(panel.style.height){
            panel.style.height = null;
        }else{
            panel.style.height = panel.scrollHeight + 'px';
        }
        e.preventDefault();
    }
}   

// 取得視窗寬度

let bodyWidth = document.body.clientWidth;
let htmlWidth = document.documentElement.clientWidth;
console.log(bodyWidth);
console.log(htmlWidth);

window.onresize = e => {
    let widowWidth = window.innerWidth;
    let menu = document.querySelector('.menu-group');
    console.log(widowWidth);
    if(widowWidth > 1200){
        menu.style.height = 'initial';
        menu.style.overflow = 'initial';
    }else{
        menu.style.height = 0;
        menu.style.overflow = 'hidden';
    }
}
