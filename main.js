function priNacteniStranky() {
 w = window.innerWidth;
 h = window.innerHeight;
let tlacitko = document.querySelector('.start');
let panacek = document.getElementById('panacek');
let micek= document.querySelector('#micek');
let panacekSirka = panacek.width;
let panacekVyska = panacek.height;
 micekSirka = micek.width;
 micekVyska = micek.height;

 modal = document.getElementById('myModal');
 	
}


document.onkeydown = detectKey;

function detectKey(e) {
    
    let posLeft = panacek.offsetLeft;
    let posTop = panacek.offsetTop;
       
    e = e || window.event;
    if (e.keyCode == '38' )  {
        // up arrow
        if (posTop > 0 && posTop < h - 80  && posLeft < w - 80 / 4 ) {
            panacek.style.top  = (posTop-10)+"px";
            panacek.src = "obrazky/dogupright.png";
        }
        else if (posTop > 0) {
            panacek.style.top  = (posTop-10)+"px";
            panacek.src = "obrazky/dogupleft.png";
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(posTop < h - 80  && posLeft < w - 80/ 4 ) {
            panacek.style.top  = (posTop+10)+"px";
            panacek.src = "obrazky/dogdownright.png";
        }
        else if (posTop < h - 80 ) {
            panacek.style.top  = (posTop+10)+"px";
            panacek.src = "obrazky/dogdownleft.png";
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
        if(posLeft > 0  ) {
            panacek.style.left  = (posLeft-10)+"px";
            panacek.src = "obrazky/dogleft.png";
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
        if(posLeft < w - 100 ) {
            panacek.style.left  = (posLeft+10)+"px";
            panacek.src = "obrazky/dogright.png";
        }  
    }
 

    detekujKolizi();
}



function detekujKolizi() {
    
    let panacekSirka = panacek.width;
    let panacekVyska = panacek.height;
    let panacekX = panacek.offsetLeft;
    let panacekY = panacek.offsetTop;
    let micekX = micek.offsetLeft;
    let micekY = micek.offsetTop;

    if (!( panacekX + panacekSirka < micekX || micekX + micekSirka < panacekX || panacekY + panacekVyska < micekY || micekY + micekVyska < panacekY))  {
        // panacek a micek se prekryvaji
        
        stekot();
        zastavSmycku();
           
    }
}

// přidáme zvuk 
function stekot() {    
    let audio = document.querySelector('#zvukpsa');
    audio.play();
}

// When the user clicks on <span> (x), close the modal
function krizek() {
    modal.style.display = "none"
}
span = document.querySelector('#close');
span.onclick = krizek;
  

let getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

intervalId = setInterval(() => {
   micek.style.left= getRandom(0, w -50) +'px'; //  Horizontally
   micek.style.top = getRandom(0, h - 50) +'px'; //  Vertically
    
  }, 4000); // every 4 seconds

// Funkce pro zastavení intervalu
function zastavSmycku() {
    clearInterval(intervalId);
    console.log("Smyčka byla zastavena");
}



