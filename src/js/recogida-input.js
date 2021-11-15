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
const palabraActual = document.querySelector('#palabra-actual');
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
    getPalabra().palabraActual;
    console.log(palabraActual);

    palabraInput.addEventListener('input', empezarJuego);

}
iniciarJuego();

function empezarJuego() {
    palabraInput.value = palabraInput.value.toLowerCase();
    if (palabrasCorrectas()) {
        seguirJugando = true;
        getPalabra();
        palabraInput.value = '';
        puntuacion++;
    }

    // Si no se logra escribir la palabra a tiempo
    if (puntacion === -1) {
        puntuacionDisplay.innerHTML = 0;
    } else {
        puntuacionDisplay.innerHTML = puntuacion;
        puntuacionMaxima.innerHTML = puntuacion;

        if (puntuacion >= maxScore) {
            localStorage.setItem('maximaPuntuacion', puntuacion);
        }
    }
    maximaPuntuacion = localStorage.getItem('');
    puntuacionDisplay.innerHTML = puntuacion;
    puntuacionMaxima.innerHTML = maximaPuntuacion;
}


function palabrasCorrectas() {
    getPalabra()
    if (palabraInput.value === palabraActual.innerHTML) {
        mensaje.innerHTML = 'Excelente, sigue con otra palabra 😀';
        return true;
    } else {
        mensaje.innerHTML = 'Mal muy mal Lechón 🙄';
        return false;
    }
}


