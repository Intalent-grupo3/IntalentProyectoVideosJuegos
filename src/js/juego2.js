// ----------------------------------------------------------------------VARIABLES GLOBALES
let obstacles = [];
let buffers = [];
let personaje;
let fondo;
let puntos = 0;
let hora;
let puntuacion;
let leaderscore = ["", "", "", "", ""];
let leaderplayer = ["", "", "", "", ""];
let velocidad;
let dist;
let registrodist;
let score;
let sizeChange;
let playerWidth;
let playerHeigth;
let dificultad;
let bufferCond = 0;
// -----------------------------------------------------------------------Inicio del juego
function startGame() {
    velocidad = 10;
    dist = 1.5;
    sizeChange = 1;
    score = 1;
    playerHeigth = 50;
    playerWidth = 50;
    dificultad = 0;
    gameArea.start();
    personaje = new component(
        playerWidth,
        playerHeigth,
        "./images/juego2/rocket.svg",
        20,
        220,
        "player"
    );
    fondo = new component(
        1800,
        490,
        "./images/juego2/ba.webp",
        1,
        1,
        "background"
    );
    resetcronometro();
    iniciarcronometro();
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#imagenBox").style.display = "none";
    if (document.querySelector("#leadList")) {
        leaderboard.removeChild(document.querySelector("#leadList"));
    }
}

let gameArea = {
    canvas: document.querySelector("#juego2"),
    // -------------------------------------------------------------------Estructura del lienzo
    start: function () {
        console.log(buffers);
        this.canvas.width = 640;
        this.canvas.height = 490;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, velocidad);
        // ---------------------------------------------------------------Evento de teclado
        window.addEventListener("keydown", function (e) {
            gameArea.keys = gameArea.keys || [];
            gameArea.keys[e.key] = e.type == "keydown";
        });
        window.addEventListener("keyup", function (e) {
            gameArea.keys[e.key] = e.type == "keydown";
        });
    },
    // --------------------------------------------------------------------Clear (deja el canvas en blanco)
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // ---------------------------------------------------------------------FIN (resetea el interval)
    end: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        clearInterval(this.interval);
        pararcronometro();
        obstacles = [];
        buffers = [];
        bufferCond = 0;
        checkleaderboard();
        document.querySelector("#botoninicio").value = "reiniciar";
        document.querySelector("#menu").style.display = "block";
    },
};
// --------------------------------------------------------------------------Declaración de componente
function component(width, height, color, x, y, type, bufferNum) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;
    this.bufferNum = bufferNum;
    if (type == "player" || type == "obstacle" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    ctx = gameArea.context;
    // ------------------------------------------------------------------------Repintado de componente
    this.update = function () {
        if (type == "player" || type == "obstacle" || type == "background") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (type == "background") {
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
        //--------------------------------------------------Modificación doficultad juego con el avance
        if (puntos >= 400) {
            velocidad = 6;
            dificultad = 0.1;
        }
        if (puntos >= 800) {
            velocidad = 4.5;
            (dist = 1), 7;
        }
        if (puntos >= 1200) {
            velocidad = 3;
            dist = 1.8;
        }
        if (puntos >= 1600) {
            velocidad = 1.5;
            dist = 1.9;
        }
        //------------------------------------------------------------------------------
        if (this.type == "player") {
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
        if (this.type == "background") {
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
    // ---------------------------------------------------------------------Comprobación de colision
    for (i = 0; i < obstacles.length; i += 1) {
        if (personaje.collision(obstacles[i])) {
            gameArea.end();
            return;
        }
    }
    // ---------------------------------------------------------------------Generacion de obstaculos
    if (gameArea.frameNo == 1 || everyinterval(velocidad * 20)) {
        x = gameArea.canvas.width;
        imageN = Math.round(Math.random() * 2);
        y = Math.random() * (gameArea.canvas.height - 50);
        obstacles.push(
            new component(
                50,
                50,
                `./images/juego2/obstacle${imageN}.svg`,
                // `./images/juego2/obstacle3.png`,
                x,
                y,
                "obstacle"
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
        (gameArea.keys && gameArea.keys["ArrowLeft"]) ||
        (gameArea.keys && gameArea.keys["a"])
    ) {
        personaje.speedX = (-dist - dificultad);
    }

    if (
        (gameArea.keys && gameArea.keys["ArrowRight"]) ||
        (gameArea.keys && gameArea.keys["d"])
    ) {
        personaje.speedX = (dist + dificultad);
    }
    if (
        (gameArea.keys && gameArea.keys["ArrowUp"]) ||
        (gameArea.keys && gameArea.keys["w"])
    ) {
        personaje.speedY = (-dist - dificultad);
    }
    if (
        (gameArea.keys && gameArea.keys["ArrowDown"]) ||
        (gameArea.keys && gameArea.keys["s"])
    ) {
        personaje.speedY = (dist + dificultad);
    }

    personaje.newPos();
    personaje.update();

    //----------------------------------------------------------------------Generación buffers
    if (!bufferCond) {
        bufferCond = 1;
        console.log("netra en condicion");
        setTimeout(bufferCreation, 5000);
    } else {
        bufferCreation();
    }

    function bufferCreation(randomN) {
        if (gameArea.frameNo == 1 || everyinterval(850)) {
            console.log(buffers);
            x = gameArea.canvas.width;
            y = Math.random() * (gameArea.canvas.height - 50);
            bufferN = Math.round(Math.random() * 5);
            buffers.push(
                new component(
                    50,
                    50,
                    `./images/juego2/buffer${bufferN}.svg`,
                    x,
                    y,
                    "obstacle",
                    bufferN
                )
            );
        }
    }

    for (i = 0; i < buffers.length; i += 1) {
        buffers[i].x += -1;
        buffers[i].update();
    }

    for (i = 0; i < buffers.length; i += 1) {
        switch (buffers[i].bufferNum) {
            case 0:
                if (personaje.collision(buffers[i])) { //buff velocidad
                    if (dist == 1.5) {
                        speedModifier(2.5);
                        console.log("speedmodifier " + dist);
                    }
                    break;
                }
                case 1:
                    if (personaje.collision(buffers[i])) { //buff puntuación
                        if (score == 1) {
                            scoreModifier(4);
                            console.log("scoremodifier " + score);
                        }
                        break;
                    }
                 case 2:
                        if (personaje.collision(buffers[i])) { //buff tamaño
                            if (sizeChange == 1) {
                                sizeModifier(1 / 1.5);
                            }
                            break;
                        }
                        case 3:
                            if (personaje.collision(buffers[i])) { //debuff velocidad
                                if (dist == 1.5) {
                                    speedModifier(1 / 2.5);
                                }
                                break;
                            }
                            case 4:
                                if (personaje.collision(buffers[i])) { //debuff puntuación
                                    if (score == 1) {
                                        scoreModifier(0.5);
                                    }
                                    break;
                                }
                                case 5:
                                    if (personaje.collision(buffers[i])) { //debuff tamaño
                                        if (sizeChange == 1) {
                                            sizeModifier(1.5);
                                        }
                                        break;
                                    }

        }
    }
    //console.log("velocidad "+dist+"; multiplicador "+score+"; tamaño"+sizeChange);
}

//---------------------------------------------------------------Cronómetro puntuación
function iniciarcronometro() {
    hora = setInterval(cronometro, (200 * score));
}

function pararcronometro() {
    clearInterval(hora);
    puntuacion = puntos;
}

function resetcronometro() {
    clearInterval(hora);
    puntos = 0;
    document.querySelector("#cronoText").innerHTML = "Puntos: ";
    document.querySelector("#puntos").innerHTML = puntos;
}

function cronometro() {
    puntos++;
    document.querySelector("#puntos").innerHTML = puntos;
}

//--------------------------------------------------------------------Leaderboard
function checkleaderboard() {
    let checking = 0;
    if (window.localStorage.length) {
        leaderplayer = JSON.parse(localStorage.getItem("jugadores"));
        leaderscore = JSON.parse(localStorage.getItem("puntuaciones"));
    } else {
        leaderscore = ["", "", "", "", ""];
        leaderplayer = ["", "", "", "", ""];
    }

    for (let i = 0; i < 5; i++) {
        if (leaderscore[i] < puntuacion) {
            checking = 1;
        }
    }
    if (checking == 1) {
        nameWinner();
    } else {
        displayLeaderboard();
    }
}

let leaderboard = document.querySelector("#leaderboard");

function nameWinner() {
    document.querySelector("#botoninicio").style.display = "none";
    let winnerInput = document.createElement("INPUT");
    winnerInput.setAttribute("type", "text");
    winnerInput.setAttribute("id", "winnerInput");
    let winnerSubmit = document.createElement("INPUT");
    winnerSubmit.setAttribute("type", "submit");
    winnerSubmit.setAttribute("id", "winnerSubmit");
    winnerSubmit.setAttribute("value", "Incluye tu nombre");
    leaderboard.appendChild(winnerInput);
    leaderboard.appendChild(winnerSubmit);
    winnerSubmit.addEventListener("click", updatearleaderboard);
}

function displayLeaderboard() {
    document.querySelector("#botoninicio").style.display = "block";

    let winnerInput = document.querySelector("#winnerInput");
    let winnerSubmit = document.querySelector("#winnerSubmit");
    if (winnerInput && winnerSubmit) {
        leaderboard.removeChild(winnerInput);
        leaderboard.removeChild(winnerSubmit);
    }

    let leadList = document.createElement("ol");
    leadList.setAttribute("id", "leadList");
    for (let i = 0; i < 5; i++) {
        if (leaderscore[i] != "") {
            let leadPlayer = document.createElement("li");
            let rowName = document.createElement("span");
            let spanName = document.createTextNode(leaderplayer[i]);
            rowName.setAttribute("id", "rowName");
            rowName.appendChild(spanName);
            let rowScore = document.createElement("span");
            let spanScore = document.createTextNode(leaderscore[i]);
            rowScore.setAttribute("id", "rowScore");
            rowScore.appendChild(spanScore);
            leadPlayer.appendChild(rowName);
            leadPlayer.appendChild(rowScore);
            leadList.appendChild(leadPlayer);
        }
    }
    leaderboard.appendChild(leadList);
}

function updatearleaderboard() {
    let playername = document.querySelector("#winnerInput").value;
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
    localStorage.setItem("puntuaciones", JSON.stringify(leaderscore));
    localStorage.setItem("jugadores", JSON.stringify(leaderplayer));
    showleaderboard();
    displayLeaderboard();
}

function showleaderboard() {
    leaderplayer = JSON.parse(localStorage.getItem("jugadores"));
    leaderscore = JSON.parse(localStorage.getItem("puntuaciones"));
}

//-------------------------------------------------------Funciones powerups
//Buffer y debuffer velocidad
function speedModifier(speedModifier) {
    //si es buffer le pasamos un valor >1 y si es debuffer <1
    registrodist = dist;
    dist = dist + speedModifier;
    setTimeout(resetSpeed, 4000, registrodist);
}

function resetSpeed(distoriginal) {
    dist = distoriginal;
}

//Buffer y debuffer puntuación
function scoreModifier(scoreModifier) {
    //si es buffer le pasamos un valor >1 y si es debuffer <1
    score = score / scoreModifier;
    clearInterval(hora);
    iniciarcronometro();
    setTimeout(resetScore, 4000);
}

function resetScore() {
    score = 1;
    clearInterval(hora);
    iniciarcronometro();
}

//Buffer y debuffer tamaño
function sizeModifier(sizeModifier) {
    //si es buffer le pasamos un valor <1 y si es debuffer >1
    sizeChange = sizeChange * sizeModifier;
    personaje.width = personaje.width * sizeChange;
    personaje.height = personaje.height * sizeChange;
    setTimeout(resetSize, 4000);
}

function resetSize() {
    sizeChange = 1;
    personaje.width = 50;
    personaje.height = 50;
}

document.querySelector("#botoninicio").addEventListener("click", startGame);