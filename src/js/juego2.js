// ----------------------------------------------------------------------VARIABLES GLOBALES
let obstacles = [];
let personaje;
let fondo;
let puntos = 0;
let hora;
let puntuacion;
let leaderscore = ['', '', '', '', ''];
let leaderplayer = ['', '', '', '', ''];

// -----------------------------------------------------------------------Inicio del juego
function startGame() {
    gameArea.start();
    personaje = new component(
        50,
        50,
        './images/juego2/rocket.svg',
        20,
        220,
        'player'
    );
    fondo = new component(
        1800,
        490,
        './images/juego2/ba.webp',
        1,
        1,
        'background'
    );
    resetcronometro();
    iniciarcronometro();
    document.querySelector('#menu').style.display = 'none';
    document.querySelector('#imagenBox').style.display = 'none';
    leaderboard.removeChild(document.querySelector('#leadList'));
}

let gameArea = {
    canvas: document.querySelector('#juego2'),
    // -------------------------------------------------------------------Estructura del lienzo
    start: function () {
        this.canvas.width = 640;
        this.canvas.height = 490;
        this.context = this.canvas.getContext('2d');
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
        // ---------------------------------------------------------------Evento de teclado
        window.addEventListener('keydown', function (e) {
            gameArea.keys = gameArea.keys || [];
            gameArea.keys[e.key] = e.type == 'keydown';
        });
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.key] = e.type == 'keydown';
        });
    },
    // --------------------------------------------------------------------Clear (deja el canvas en blanco)
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // ---------------------------------------------------------------------FIN (resetea el interval)
    end: function () {
        clearInterval(this.interval);
        pararcronometro();
        obstacles = [];
        checkleaderboard();
        document.querySelector('#botoninicio').value = 'reiniciar';
        document.querySelector('#menu').style.display = 'block';
    },
};
// --------------------------------------------------------------------------Declaración de componente
function component(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;
    if (type == 'player' || type == 'obstacle' || type == 'background') {
        this.image = new Image();
        this.image.src = color;
    }
    ctx = gameArea.context;
    // ------------------------------------------------------------------------Repintado de componente
    this.update = function () {
        if (type == 'player' || type == 'obstacle' || type == 'background') {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (type == 'background') {
                ctx.drawImage(
                    this.image,
                    this.x + this.width,
                    this.y,
                    this.width,
                    this.height
                );
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    // -------------------------------------------------------------------------Posicion del personaje
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == 'player') {
            if (this.x > 590) {
                this.x = 590;
            }
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.y > 440) {
                this.y = 440;
            }
            if (this.y < 0) {
                this.y = 0;
            }
        }
        if (this.type == 'background') {
            if (this.x == -this.width) {
                this.x = 0;
            }
        }
    };
    // -------------------------------------------------------------------------Colision
    this.collision = function (obstacle) {
        let left = this.x;
        let right = this.x + this.width;
        let top = this.y;
        let bottom = this.y + this.height;
        let obstacleleft = obstacle.x;
        let obstacleright = obstacle.x + obstacle.width;
        let obstacletop = obstacle.y;
        let obstaclebottom = obstacle.y + obstacle.height;
        let crash = true;
        if (
            bottom < obstacletop ||
            top > obstaclebottom ||
            right < obstacleleft ||
            left > obstacleright
        ) {
            crash = false;
        }
        return crash;
    };
}

// -------------------------------------------------------------------------Nuevo frame
function updateGameArea() {
    gameArea.clear();
    fondo.x += -0.2;
    fondo.update();
    gameArea.frameNo += 1;
    // ---------------------------------------------------------------------Comprovación de colision
    for (i = 0; i < obstacles.length; i += 1) {
        if (personaje.collision(obstacles[i])) {
            gameArea.end();
            return;
        }
    }
    // ---------------------------------------------------------------------Generacion de obstaculos
    if (gameArea.frameNo == 1 || everyinterval(200)) {
        x = gameArea.canvas.width;
        imageN = Math.round(Math.random() * 2 + 1);
        y = Math.random() * (gameArea.canvas.height - 50);
        obstacles.push(
            new component(
                50,
                50,
                `./images/juego2/obstacle${imageN}.png`,
                // `./images/juego2/obstacle3.png`,
                x,
                y,
                'obstacle'
            )
        );
    }

    function everyinterval(n) {
        if ((gameArea.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }
    // ---------------------------------------------------------------------Movimiento de obstaculos
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    // ---------------------------------------------------------------------Movimiento de personaje
    personaje.speedX = 0;
    personaje.speedY = 0;
    if (
        (gameArea.keys && gameArea.keys['ArrowLeft']) ||
        (gameArea.keys && gameArea.keys['a'])
    ) {
        personaje.speedX = -1.5;
    }

    if (
        (gameArea.keys && gameArea.keys['ArrowRight']) ||
        (gameArea.keys && gameArea.keys['d'])
    ) {
        personaje.speedX = 1.5;
    }
    if (
        (gameArea.keys && gameArea.keys['ArrowUp']) ||
        (gameArea.keys && gameArea.keys['w'])
    ) {
        personaje.speedY = -1.5;
    }
    if (
        (gameArea.keys && gameArea.keys['ArrowDown']) ||
        (gameArea.keys && gameArea.keys['s'])
    ) {
        personaje.speedY = 1.5;
    }

    personaje.newPos();
    personaje.update();
}

//---------------------------------------------------------------Cronómetro puntuación
function iniciarcronometro() {
    hora = setInterval(cronometro, 50);
}

function pararcronometro() {
    clearInterval(hora);
    puntuacion = puntos;
}

function resetcronometro() {
    clearInterval(hora);
    puntos = 0;
    document.querySelector('#cronoText').innerHTML = 'Puntos: ';
    document.querySelector('#puntos').innerHTML = puntos;
}

function cronometro() {
    puntos++;
    document.querySelector('#puntos').innerHTML = puntos;
}

//--------------------------------------------------------------------Leaderboard
function checkleaderboard() {
    console.log(puntuacion);
    console.log(leaderscore);
    let checking = 0;
    if (window.localStorage.length) {
        leaderplayer = JSON.parse(localStorage.getItem('jugadores'));
        leaderscore = JSON.parse(localStorage.getItem('puntuaciones'));
        console.log(leaderscore);
    } else {
        leaderscore = ['', '', '', '', ''];
        leaderplayer = ['', '', '', '', ''];
    }
    console.log(leaderscore);
    for (let i = 0; i < 5; i++) {
        if (leaderscore[i] < puntuacion) {
            //sacar el menú de meter nombre y enviar highscore
            checking = 1;
        }
    }
    if (checking == 1) {
        nameWinner();
    } else {
        displayLeaderboard();
    }
}

let leaderboard = document.querySelector('#leaderboard');

function nameWinner() {
    document.querySelector('#botoninicio').style.display = 'none';
    let winnerInput = document.createElement('INPUT');
    winnerInput.setAttribute('type', 'text');
    winnerInput.setAttribute('id', 'winnerInput');
    let winnerSubmit = document.createElement('INPUT');
    winnerSubmit.setAttribute('type', 'submit');
    winnerSubmit.setAttribute('id', 'winnerSubmit');
    winnerSubmit.setAttribute('value', 'Incluye tu nombre');
    leaderboard.appendChild(winnerInput);
    leaderboard.appendChild(winnerSubmit);
    winnerSubmit.addEventListener('click', updatearleaderboard);
    console.log('entra en crea input');
}

function displayLeaderboard() {
    document.querySelector('#botoninicio').style.display = 'block';
    console.log('entra en displayLeaderboard');
    let winnerInput = document.querySelector('#winnerInput');
    let winnerSubmit = document.querySelector('#winnerSubmit');
    if (winnerInput && winnerSubmit) {
        console.log('borra inputs');
        leaderboard.removeChild(winnerInput);
        leaderboard.removeChild(winnerSubmit);
    }

    let leadList = document.createElement('ol');
    leadList.setAttribute('id', 'leadList');
    for (let i = 0; i < 5; i++) {
        if (leaderscore[i] != '') {
            let leadPlayer = document.createElement('li');
            let rowName = document.createElement('span');
            let spanName = document.createTextNode(leaderplayer[i]);
            rowName.setAttribute('id', 'rowName');
            rowName.appendChild(spanName);
            let rowScore = document.createElement('span');
            let spanScore = document.createTextNode(leaderscore[i]);
            rowScore.setAttribute('id', 'rowScore');
            rowScore.appendChild(spanScore);
            leadPlayer.appendChild(rowName);
            leadPlayer.appendChild(rowScore);
            leadList.appendChild(leadPlayer);
        }
    }
    leaderboard.appendChild(leadList);
}

function updatearleaderboard() {
    let playername = document.querySelector('#winnerInput').value; //Aquí va el value del input del name del jugador
    let newlead = 0;
    let holderplayerin;
    let holderplayerout;
    let holderscorein;
    let holderscoreout;
    for (let i = 0; i < 5; i++) {
        if (leaderscore[i] < puntuacion && newlead == 0) {
            newlead = 1;
            holderplayerin = playername;
            holderscorein = puntuacion;
        }
        if (newlead == 1) {
            holderplayerout = holderplayerin;
            holderplayerin = leaderplayer[i];
            leaderplayer[i] = holderplayerout;

            holderscoreout = holderscorein;
            holderscorein = leaderscore[i];
            leaderscore[i] = holderscoreout;
        }
    }
    localStorage.setItem('puntuaciones', JSON.stringify(leaderscore));
    localStorage.setItem('jugadores', JSON.stringify(leaderplayer));
    showleaderboard();
    displayLeaderboard();
}

function showleaderboard() {
    leaderplayer = JSON.parse(localStorage.getItem('jugadores'));
    leaderscore = JSON.parse(localStorage.getItem('puntuaciones'));
    console.log(leaderscore);
    //poner que te saque los elementos de la leaderboard ordenados
}
document.querySelector('#botoninicio').addEventListener('click', startGame);
//document.querySelector("#submitjugador").addEventListener("click", actualizarleaderboard)
