let w = window.innerWidth;
let h = window.innerHeight;
let tlacitko = document.querySelector('.start');
let panacek = document.getElementById('panacek');
let mince= document.querySelector('#mince');
let panacekSirka = panacek.width;
let panacekVyska = panacek.height;
let minceSirka = mince.width;
let minceVyska = mince.height;
let score = document.querySelector('#score');
let pocetMinci;
	// a umístíme panáčka do středu okna
let	panacekX = Math.round(window.innerWidth / 2 - panacekSirka / 2);
let	panacekY = Math.round(window.innerHeight / 2 - panacekVyska / 2);
const btn = document.getElementById('tlacitko');

pocetMinci = 0;
	

btn.addEventListener('click', () => {
    // 👇️ hide button
    btn.style.display = 'none';

  });

document.onkeydown = detectKey;

function detectKey(e) {
    
    let posLeft = panacek.offsetLeft;
    let posTop = panacek.offsetTop;
       
    e = e || window.event;
    if (e.keyCode == '38' )  {
        // up arrow
        if (posTop > 0 && posTop < h - 80  && posLeft < w - 80 / 4 ) {
            panacek.style.top  = (posTop-10)+"px";
            panacek.src = "obrazky/dogup2.png";
        }
        else if (posTop > 0) {
            panacek.style.top  = (posTop-10)+"px";
            panacek.src = "obrazky/dogup.png";
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
    let panacekX = panacek.offsetLeft;
    let panacekY = panacek.offsetTop;
    let minceX = mince.offsetLeft;
    let minceY = mince.offsetTop;

    if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY))  {
        // panacek a mince se prekryvaji
       
        cink();

        
           
    }
}
 


// přidáme zvuk cinknutí
function cink() {    
    let audio = document.querySelector('#zvukmince');
    audio.play();
}

let getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

setInterval(() => {

   mince.style.left= getRandom(0, w -50) +'px'; //  Horizontally
   mince.style.top = getRandom(0, h - 50) +'px'; //  Vertically
    
  }, 4000); // every 4 seconds

 



