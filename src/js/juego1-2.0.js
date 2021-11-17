let palabraActual;
let palabraEscrita;
let puntuacion = 0;
const niveles = {
    facil: 15,
    medio: 10,
    dificil: 5,
};
let leaderscore = ['', '', '', '', ''];
let tiempoMax;
let tiempo = 0;
let palabraEnunciado = document.querySelector('#palabra-enunciado');
const palabraInput = document.querySelector('#palabra-input');
palabraInput.disabled = true;
const segundos = document.querySelector('#segundos');
const mensaje = document.querySelector('#message');
const temporizador = document.querySelector('#temporizador');
const score = document.querySelector('#score');
const tiempoDisplay = document.querySelector('#time');
const facilBtn = document.querySelector('#easy');
const medioBtn = document.querySelector('#medium');
const dificilBtn = document.querySelector('#hard');
const leaderboard = document.querySelector('#leaderboard');

async function getPalabra() {
    fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
        .then((response) => response.json())
        .then((data) => {
            palabraActual = data.body.Word;
            palabraEnunciado.innerHTML = palabraActual;
        });
}

function seleccionarNivel(e) {
    if (e.target === facilBtn) {
        tiempoMax = niveles.facil;
    } else if (e.target === medioBtn) {
        tiempoMax = niveles.medio;
    } else if (e.target === dificilBtn) {
        tiempoMax = niveles.dificil;
    }
    iniciarJuego();
}

function nivel() {
    segundos.innerHTML = tiempoMax;
    cuentaAtras(tiempoMax);
}

//Funcion para inicializar el juego
function iniciarJuego() {
    puntuacion = 0;
    palabraInput.disabled = false;
    message.innerHTML = '';
    //Se agregan los segundos en el display
    nivel();
    //Se cargan las palabras
    getPalabra();
    palabraInput.addEventListener('input', escribirPalabra);
}

//Funcion para empezar el juego
function escribirPalabra() {
    palabraEscrita = palabraInput.value.toLowerCase();
    if (palabrasCorrectas()) {
        getPalabra();
        palabraInput.value = '';
        puntuacion++;
    }
    // Si no se logra escribir la palabra a tiempo
    score.innerHTML = puntuacion;
}

//Funcion de comparar las palabras lanzadas por el api con las escritas por el cliente
function palabrasCorrectas() {
    if (palabraEscrita === palabraActual) {
        mensaje.innerHTML = '😀';
        clearInterval(tiempoActual);
        return true;
    } else {
        mensaje.innerHTML = '🙄';
        return false;
    }
}

//Funcion para el cronometro del juego
let intervaloTiempo;
function cuentaAtras(t) {
    tiempo = t;
    clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(tiempoActual, 1000);
}

function tiempoActual() {
    temporizador.innerHTML = tiempo;
    tiempo--;
    if (tiempo < 0) {
        clearInterval(intervaloTiempo);
        palabraInput.disabled = true;
        palabraInput.removeEventListener('input', escribirPalabra);
        message.innerHTML = '¡Se te acabó el tiempo! 😞😞😞';
        checkLeaderboard();
    }
}

//--------------------------------------------------------------------Leaderboard

function checkLeaderboard() {
    if (localStorage.getItem('puntosKeyboard')) {
        leaderscore = JSON.parse(localStorage.getItem('puntosKeyboard'));
    } else {
        leaderscore = ['', '', '', '', ''];
    }

    updateLeaderboard();
}

function updateLeaderboard() {
    let newlead = 0;
    let holderscorein;
    let holderscoreout;
    for (let i = 0; i < 5; i++) {
        if (leaderscore[i] < puntuacion && newlead == 0) {
            newlead = 1;
            holderscorein = puntuacion;
        }
        if (newlead == 1) {
            holderscoreout = holderscorein;
            holderscorein = leaderscore[i];
            leaderscore[i] = holderscoreout;
        }
    }
    localStorage.setItem('puntosKeyboard', JSON.stringify(leaderscore));
    leaderscore = JSON.parse(localStorage.getItem('puntosKeyboard'));
    displayLeaderboard();
}

function displayLeaderboard() {
    let leadList = document.createElement('ol');
    leadList.setAttribute('id', 'leadList');
    let listElement = document.querySelector('#leadList');
    if (listElement) {
        leaderboard.removeChild(listElement);
    }
    leadList.setAttribute('id', 'leadList');
    for (let i = 0; i < 5; i++) {
        if (leaderscore[i] != '') {
            let leadPlayer = document.createElement('li');
            let rowScore = document.createElement('span');
            let spanScore = document.createTextNode(leaderscore[i]);
            rowScore.setAttribute('id', 'rowScore');
            rowScore.appendChild(spanScore);
            leadPlayer.appendChild(rowScore);
            leadList.appendChild(leadPlayer);
        }
    }
    leaderboard.appendChild(leadList);
}

//--------------------------------------------------------------------Eventos de selección de nivel

facilBtn.addEventListener('click', seleccionarNivel);
medioBtn.addEventListener('click', seleccionarNivel);
dificilBtn.addEventListener('click', seleccionarNivel);
