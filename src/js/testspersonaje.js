let personaje;

function startGame() {
    personaje = new component(50, 50, 'green', 20, 220);
    return personaje;
}
 console.log(startGame())




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
            this.x +=(this.speedX);
            this.y+=(this.speedY);
            return [this.x,this.y];
        }
}

function updateGameArea(x,y) {
    
    personaje.speedX=0;
    personaje.speedY=0;
    if (x==-1) {personaje.speedX = -1.5;
        console.log(personaje.speedX); }
    if (x==1) {personaje.speedX = 1.5; }
    if (y==-1 ) {personaje.speedY = -1.5; }
    if (y==1 ) {personaje.speedY = 1.5; }
     return personaje.newPos();
}
module.exports={updateGameArea,
 startGame}
startGame();