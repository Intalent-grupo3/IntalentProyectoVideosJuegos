
/*Puntos para no olvidar mañana xD
Se cargan bien las palabras del api y al jugar funciona bien el match y va aumentando la puntuacion
pero cuando se termina el tiempo, se puede seguir jugando, también falta lo de seleccionar la dificultad
ya que cuando se selecciona genera una palabra nueva pero no se cambia el tiempo y sigue corriendo el tiempo de la otra dificultad.*/


let puntuacion = 0;
let seguirJugando;
let maximaPuntuacion;
const niveles = {
    facil: 30,
    medio: 20,
    dificil: 10
}
let nivelActual = niveles.facil;

const palabraInput = document.querySelector('#palabra-input');
let palabraActual = document.querySelector('#palabra-actual');
const mensaje = document.querySelector('#message');
const segundos = document.querySelector('#segundos');
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
        currentLevel = niveles.medio;
    } else if (e.target === dificilBtn) {
        currentLevel = niveles.dificil;
    }
    iniciarJuego();
}

function iniciarJuego() {
    //Se agregan los segundos en el display
    segundos.innerHTML = nivelActual;
    //Se cargan las palabras
    getPalabra();
    palabraInput.addEventListener('input', empezarJuego);
    setInterval(statusJugador, 50);
    maximaPuntuacion = localStorage.getItem('maximapuntuacion');
    puntuacionDisplay.innerHTML = maximaPuntuacion;

}
iniciarJuego();

function empezarJuego() {
    palabraInput.value = palabraInput.value.toLowerCase();
    if (palabrasCorrectas()) {
        seguirJugando = true;
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


function palabrasCorrectas() {
    //Funcion de comparar las palabras lanzadas por el api con las escritas por el cliente
    if (palabraInput.value === palabraActual) {
        mensaje.innerHTML = 'Excelente, sigue con otra palabra 😀';
        return true;
    } else {
        mensaje.innerHTML = '🙄';
        return false;
    }
}

function temporizador() {
    var segundos = 30;
    setInterval(function () {

        document.getElementById("temporizador").innerHTML = segundos;
        segundos--;
        if (segundos <= 0) {
            document.getElementById("temporizador").innerHTML = "TIEMPO COMPLETADO";

        }

    }, 1000);
}
temporizador()

function statusJugador() {
    if (!seguirJugando && segundos === 0) {
        message.innerHTML = 'Haz perdido! 😞😞😞';
        score = -1;
    }
}

facilBtn.addEventListener('click', seleccionarNivel);
medioBtn.addEventListener('click', seleccionarNivel);
dificilBtn.addEventListener('click', seleccionarNivel);