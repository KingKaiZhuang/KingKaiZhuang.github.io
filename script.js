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