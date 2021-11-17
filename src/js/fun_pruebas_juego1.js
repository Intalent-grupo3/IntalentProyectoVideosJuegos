
//Funcion de comparar las palabras lanzadas por el api con las escritas por el cliente
function palabrasCorrectas() {
    let palabraInput = "a";
    let palabraActual = "a";
    let mensaje;
    if (palabraInput.value === palabraActual) {
        mensaje = '😀';
        return true;
    } else {
        mensaje = '🙄';
        return false;
    }
}

function statusJugador() {
    let seguirJugando;
    let tiempo;
    let mensaje;
    let puntuacion;

    if (!seguirJugando && tiempo === 0) {
        return mensaje = 'Se te acabo tu tiempo! 😞😞😞';
        puntuacion = -1;
    }
}

function tiempoActual() {
    let tiempo;
    let mensaje;
    if (tiempo <= 0) {
        clearInterval(tiempoActual);
        mensaje = "TIEMPO COMPLETADO";
        statusJugador();
    }
}


function temporizador(a) {
    tiempo = a;
    setInterval(tiempoActual, 1000);
}

module.exports = {
    palabrasCorrectas, statusJugador, tiempoActual, temporizador
}