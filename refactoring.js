// ============================================================
//  Herní stav — všechny sdílené proměnné na úrovni modulu
// ============================================================
const KROK = 10;           // px per keypress
const INTERVAL_MS = 4000;  // how often the ball moves

let w;
let h;
let panacek;
let micek;
let modal;
let intervalId;

// Derived sizes — set once after DOM loads
let panacekSirka;
let panacekVyska;
let micekSirka;
let micekVyska;

// ============================================================
//  Inicializace při načtení stránky
// ============================================================
function priNacteniStranky() {
    w = window.innerWidth;
    h = window.innerHeight;

    panacek = document.getElementById('panacek');
    micek = document.querySelector('#micek');
    modal = document.getElementById('myModal');

    panacekSirka = panacek.width;
    panacekVyska = panacek.height;
    micekSirka = micek.width;
    micekVyska = micek.height;

    const zavritBtn = document.querySelector('#close');
    zavritBtn.addEventListener('click', zavriModal);

    spustSmycku();
}

window.addEventListener('load', priNacteniStranky);

// ============================================================
//  Klávesnice
// ============================================================
document.addEventListener('keydown', zpracujKlavesu);

function zpracujKlavesu(e) {
    const posLeft = panacek.offsetLeft;
    const posTop = panacek.offsetTop;

    switch (e.key) {
        case 'ArrowUp':
            if (posTop > 0 && posTop < h - 80 && posLeft < w - 80) {
                panacek.style.top = (posTop - KROK) + 'px';
                panacek.src = 'obrazky/dogupright.png';
            } else if (posTop > 0) {
                panacek.style.top = (posTop - KROK) + 'px';
                panacek.src = 'obrazky/dogupleft.png';
            }
            break;

        case 'ArrowDown':
            if (posTop < h - 80 && posLeft < w - 80) {
                panacek.style.top = (posTop + KROK) + 'px';
                panacek.src = 'obrazky/dogdownright.png';
            } else if (posTop < h - 80) {
                panacek.style.top = (posTop + KROK) + 'px';
                panacek.src = 'obrazky/dogdownleft.png';
            }
            break;

        case 'ArrowLeft':
            if (posLeft > 0) {
                panacek.style.left = (posLeft - KROK) + 'px';
                panacek.src = 'obrazky/dogleft.png';
            }
            break;

        case 'ArrowRight':
            if (posLeft < w - 100) {
                panacek.style.left = (posLeft + KROK) + 'px';
                panacek.src = 'obrazky/dogright.png';
            }
            break;
    }

    detekujKolizi();
}

// ============================================================
//  Detekce kolize (AABB)
// ============================================================
function detekujKolizi() {
    const panacekX = panacek.offsetLeft;
    const panacekY = panacek.offsetTop;
    const micekX = micek.offsetLeft;
    const micekY = micek.offsetTop;

    const prekryv = !(
        panacekX + panacekSirka < micekX ||
        micekX + micekSirka < panacekX  ||
        panacekY + panacekVyska < micekY ||
        micekY + micekVyska < panacekY
    );

    if (prekryv) {
        stekot();
        zastavSmycku();
    }
}

// ============================================================
//  Zvuk
// ============================================================
function stekot() {
    const audio = document.querySelector('#zvukpsa');
    audio.play();
}

// ============================================================
//  Modal
// ============================================================
function zavriModal() {
    modal.style.display = 'none';
}

// ============================================================
//  Pohyb míčku
// ============================================================
const getNahodne = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function spustSmycku() {
    intervalId = setInterval(() => {
        micek.style.left = getNahodne(0, w - 50) + 'px';
        micek.style.top  = getNahodne(0, h - 50) + 'px';
    }, INTERVAL_MS);
}

function zastavSmycku() {
    clearInterval(intervalId);
    console.log('Smyčka byla zastavena');
}