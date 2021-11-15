let obstacles = [];
let obstacle;

function startGame() {
    gameArea.start();
    obstacle = new component(50, 50, 'green', 400, 200);
}

let gameArea = {
    canvas: document.querySelector('#juego2'),
    start: function () {
        this.canvas.width = 640;
        this.canvas.height = 490;
        this.context = this.canvas.getContext('2d');
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    end: function () {
        clearInterval(this.interval);
    },
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
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

function updateGameArea() {
    gameArea.clear();
    gameArea.frameNo += 1;
    for (i = 0; i < obstacles.length; i += 1) {
        if (personaje.collision(obstacles[i])) {
            gameArea.end();
            return;
        }
    }
    if (gameArea.frameNo == 1 || everyinterval(200)) {
        x = gameArea.canvas.width;
        y = Math.random() * (gameArea.canvas.height - 50);
        obstacles.push(new component(50, 50, 'green', x, y));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    function everyinterval(n) {
        if ((gameArea.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }
    obstacle.x += -1;
    obstacle.update();
}

startGame();
