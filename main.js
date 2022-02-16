setUp();

function setUp(){
    let btn = document.querySelector('.btn');
    btn.addEventListener('click', game);
    let container = document.querySelector('.container');
    createTable();
    function createTable(){
        let prepare = ``;
        for (let i = 0; i < 36; i++){
            let random = Math.floor(Math.random()*icons.length);
            prepare += `

            <div class = "box">
            <div class ="back"> ${icons[random]} </div>
            <div class ="front"> </div>
            </div>
            `
            icons.splice(random,1);
        }
        container.innerHTML = prepare;
    }
}

function game(){
    let btn = document.querySelector('.btn');
    console.log(btn);
    btn.innerHTML = "ENJOY";
    let twoFlipped = [];
    let boxes = document.querySelectorAll('.box');
    addCliks();

    function addCliks(){
        let boxes = document.querySelectorAll('.box');
        boxes.forEach(box => box.addEventListener('click',flip));
    }
    function flip(){
        this.removeEventListener('click', flip);
        twoFlipped.push(this);
        let back = this.querySelector('.back');
        let front = this.querySelector('.front');
        front.style.transform = "rotateY(180deg)";
        back.style.transform = "rotateY(0deg)";
        if(twoFlipped.length === 2){
            checkCards();
        };
    }
    function checkCards(){
        removeClicks();
        let front1= twoFlipped[0].querySelector('.front');
        let back1 = twoFlipped[0].querySelector('.back');
        let front2= twoFlipped[1].querySelector('.front');
        let back2 = twoFlipped[1].querySelector('.back');
        if(back1.innerHTML === back2.innerHTML){
            twoFlipped[0].className = "selected";
            back1.style.color = "greenyellow";
            twoFlipped[1].className = "selected";
            back2.style.color = "greenyellow";
            twoFlipped.length = 0;
            addCliks();
        }else{
            setTimeout(() => {
                front1.style.transform = "rotateY(0deg)";
                back1.style.transform = "rotateY(180deg)";
                front2.style.transform = "rotateY(0deg)";
                back2.style.transform = "rotateY(180deg)";
                twoFlipped.length = 0;
                addCliks();
            }, 800);
        }
    }
    function removeClicks(){
        boxes.forEach(box => box.removeEventListener('click',flip));
    }
}
