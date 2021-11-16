let personaje;

function startGame() {
    gameArea.start();
    personaje = new component(50, 50, 'green', 20, 220);
}


var gameArea = {
    canvas: document.querySelector('#juego2'),
    start: function () {
        this.canvas.width = 680;
        this.canvas.height = 490;
        this.context = this.canvas.getContext('2d');
        this.interval = setInterval(updateGameArea,10);
        window.addEventListener("keydown",function(e){
            gameArea.keys=(gameArea.keys || []);
            gameArea.keys[e.key]=(e.type=="keydown");
        });
        window.addEventListener("keyup",function(e){
            gameArea.keys[e.key] = (e.type=="keydown");
        })
        
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX=0;
        this.speedY=0;
        this.update = function () {
            ctx= gameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.newPos=function(){
            this.x +=this.speedX;
            this.y +=this.speedY;
            if (this.x>590){
                this.x=590;
            }
            if (this.x<0){
                this.x=0;
            }
            if (this.y>440){
                this.y=440;
            }
            if (this.y<0){
                this.y=0;
            }
        }
}

function updateGameArea() {
    gameArea.clear();
    personaje.speedX=0;
    personaje.speedY=0;
    if (gameArea.keys && gameArea.keys["ArrowLeft"] || gameArea.keys && gameArea.keys["a"] ) {personaje.speedX = -1.5; }
    if (gameArea.keys && gameArea.keys["ArrowRight"] || gameArea.keys && gameArea.keys["d"] ) {personaje.speedX = 1.5; }
    if (gameArea.keys && gameArea.keys["ArrowUp"] || gameArea.keys && gameArea.keys["w"] ) {personaje.speedY = -1.5; }
    if (gameArea.keys && gameArea.keys["ArrowDown"] || gameArea.keys && gameArea.keys["s"] ) {personaje.speedY = 1.5; }
    personaje.newPos();
    personaje.update();
}

startGame();