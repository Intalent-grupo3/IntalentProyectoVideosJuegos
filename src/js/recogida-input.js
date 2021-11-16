window.addEventListener('load', iniciarJuego);

let puntuacion = 0;
let seguirJugando;
let maximaPuntuacion;
const niveles = {
    facil: 15,
    medio: 10,
    dificil: 5
}
let nivelActual;


const palabraInput = document.querySelector('#palabra-input');
let palabraActual = document.querySelector('#palabra-actual');
const mensaje = document.querySelector('#message');
const segundos = document.querySelector('#temporizador');
const puntuacionDisplay = document.querySelector('#score');
const tiempoDisplay = document.querySelector('#time');
const puntuacionMaxima = document.querySelector('#high-score');
const facilBtn = document.querySelector('#easy');
const medioBtn = document.querySelector('#medium');
const dificilBtn = document.querySelector('#hard');

async function getPalabra() {
    palabraActual;
    fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById("palabra-enunciado").innerHTML = data.body.Word;
            palabraActual = data.body.Word;
        });
}


function seleccionarNivel(e) {
    if (e.target === facilBtn) {
        nivelActual = niveles.facil;
    } else if (e.target === medioBtn) {
        nivelActual = niveles.medio;
    } else if (e.target === dificilBtn) {
        nivelActual = niveles.dificil;
    }
    iniciarJuego();
}

function nivel() {
    if (nivelActual === niveles.facil) {

        segundos.innerHTML = nivelActual;
        statusJugador()
        temporizador(15)
    }
    else if (nivelActual === niveles.medio) {
        segundos.innerHTML = nivelActual;
        statusJugador()
        temporizador(10)
    } else if (nivelActual === niveles.dificil) {
        segundos.innerHTML = nivelActual;
        statusJugador()
        temporizador(5)
    }
}

//Funcion para inicializar el juego
function iniciarJuego() {
    //Se agregan los segundos en el display
    nivel();
    //Se cargan las palabras
    getPalabra();
    palabraInput.addEventListener('input', empezarJuego);
    maximaPuntuacion = localStorage.getItem('maximapuntuacion');
    puntuacionDisplay.innerHTML = maximaPuntuacion;
}
iniciarJuego();

//Funcion para empezar el juego
function empezarJuego() {
    palabraInput.value = palabraInput.value.toLowerCase();
    if (palabrasCorrectas()) {
        //tiempo = nivelActual;
        getPalabra(palabraActual);
        palabraInput.value = '';
        puntuacion++;
    }

    // Si no se logra escribir la palabra a tiempo
    if (puntuacion === -1) {
        puntuacionDisplay.innerHTML = 0;
    } else {
        puntuacionDisplay.innerHTML = puntuacion;
        puntuacionMaxima.innerHTML = puntuacion;

        if (puntuacion >= maxScore) {
            localStorage.setItem('maximaPuntuacion', puntuacion);
        }
    }
    maximaPuntuacion = localStorage.getItem('maximaPuntuacion');
    puntuacionDisplay.innerHTML = puntuacion;
    puntuacionMaxima.innerHTML = maximaPuntuacion;
}

//Funcion de comparar las palabras lanzadas por el api con las escritas por el cliente
function palabrasCorrectas() {

    if (palabraInput.value === palabraActual) {
        mensaje.innerHTML = '😀';
        return true;
    } else {
        mensaje.innerHTML = '🙄';
        return false;
    }
}

//Funcion para el cronometro del juego 
let tiempo;
function temporizador(a) {
    tiempo = a;
    setInterval(tiempoActual, 1000);
}

function tiempoActual() {
    document.getElementById("temporizador").innerHTML = tiempo;
    tiempo--;
    if (tiempo <= 0) {
        clearInterval(tiempoActual);
        document.getElementById("temporizador").innerHTML = "TIEMPO COMPLETADO";
        statusJugador();
    }
}

//Funcion para parar cuando el cronometro llega a 0
function statusJugador() {
    if (!seguirJugando && tiempo === 0) {
        message.innerHTML = 'Se te acabo tu tiempo! 😞😞😞';
        puntuacion = -1;
    }
}


facilBtn.addEventListener('click', seleccionarNivel);
medioBtn.addEventListener('click', seleccionarNivel);
dificilBtn.addEventListener('click', seleccionarNivel);