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
//-------------------------------------------------------Funciones powerups
//Buffer y debuffer velocidad
function speedModifier(speedModifier,prueba) {
    //si es buffer le pasamos un valor >1 y si es debuffer <1
    let dist=1.5;
    let registrodist = dist;
    dist = dist + speedModifier;
    if (prueba==0){
        return dist;
    }
    if( prueba==1){
    setTimeout(resetSpeed, 1000,registrodist);
    return dist;
    }
}

function resetSpeed(distoriginal) {
    dist = distoriginal;
    

}

//Buffer y debuffer puntuación
function scoreModifier(scoreModifier,prueba) {
    //si es buffer le pasamos un valor >1 y si es debuffer <1
    let score=1
    score = score / scoreModifier;
    if (prueba==0){
        return score;
    }
    if( prueba==1){
    setTimeout(resetScore, 1000);
    return score;
    }
}

function resetScore() {
    score = 1;
}

//Buffer y debuffer tamaño
function sizeModifier(sizeModifier,prueba) {
    //si es buffer le pasamos un valor <1 y si es debuffer >1
    sizeChange=1;
    personaje.width=50;
    personaje.height=50;
    sizeChange = sizeChange * sizeModifier;
    personaje.width = personaje.width * sizeChange;
    personaje.height = personaje.height * sizeChange;
    if (prueba==0){
        return personaje.width,personaje.height;
    }
    if( prueba==1){
    setTimeout(resetSize, 1000);
    return personaje.width,personaje.height;
    }
}

function resetSize() {
    sizeChange = 1;
    personaje.width = 50;
    personaje.height = 50;

}



module.exports={updateGameArea,
 startGame,
sizeModifier,
scoreModifier,
speedModifier}
startGame();