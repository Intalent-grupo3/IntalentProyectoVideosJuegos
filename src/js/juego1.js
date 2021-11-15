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