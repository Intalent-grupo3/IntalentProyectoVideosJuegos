async function getPalabra() {
    let palabra;
    fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById("palabra-enunciado").innerHTML = data.body.Word;
            palabra = data.body.Word;
            console.log(palabra)
        });
}

getPalabra()

function temporizador() {
    var segundos = 30;
  setInterval(function() {
      
    document.getElementById("temporizador").innerHTML = segundos;
    segundos--;
    if (segundos <= 0) {
        document.getElementById("temporizador").innerHTML = "TIEMPO COMPLETADO";

    }
    
  }, 1000);
}
temporizador()