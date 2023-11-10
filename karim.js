let board;
let boardWidth = 600;
let boardHeight = 640;
let context;

let background = new Image();
background.src = "img/bg4.png";

let playerImages = ["img/player3.png"];

let backgroundmusic = new Audio();
backgroundmusic.src = "music/backgroundmusic.mp3";

// let jumpsound = new Audio();
// jumpsound.src = "music/jump.mp3";
// jumpsound.volume = 0.5;

let gameOversound = new Audio();
gameOversound.src = "music/gameover.mp3";
gameOversound.volume = 0.5;

let player1Width = 50;
let player1Height = 50;
let player1X = boardWidth / 8;
let player1Y = boardHeight / 2;
let player1Img;

let player1 = {
  x: player1X,
  y: player1Y,
  width: player1Width,
  height: player1Height,
  velocity: 0,
  gravity: 0.5,
};

let toppipe = new Image();
toppipe.src = "img/toppipe.png";

let bottompipe = new Image();
bottompipe.src = "img/bottompipe.png";

let toppipeWidth = 50;
let toppipeHeight = randomHeight(100, 230);
let toppipeSpeed = 5;
let toppipeX = boardWidth;
let toppipeY = 0;

let bottompipeWidth = 50;
let bottompipeHeight = randomHeight(-150, -270);
let bottompipeX = boardWidth;
let bottompipeY = 640;

let bottompipeSpeed = 5;

let pipes = [];

let score = 0;

let coin = new Image();
coin.src = "img/coin.png";
let coinX = boardWidth + 100;
let coinY = randomHeight(100, boardHeight - 100);
let coinWidth = 50;
let coinHeight = 50;
let coinVisible = true;
let coinSpeed = 3;

let gameOver = false;

let backgroundX = 0;

let pipeOscillationRange = 40;
let pipeOscillationSpeed = 0.5;

function randomHeight(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initPipes() {
  toppipeHeight = randomHeight(100, 230);
  bottompipeHeight = randomHeight(-150, -270);

  pipes.push({
    toppipeX: boardWidth,
    toppipeY: 0,
    toppipeHeight: toppipeHeight,
    bottompipeX: boardWidth,
    bottompipeY: bottompipeY,
    bottompipeHeight: bottompipeHeight,
    passed: false,
  });

  pipes.push({
    toppipeX: boardWidth + 300,
    toppipeY: 0,
    toppipeHeight: randomHeight(150, 330),
    bottompipeX: boardWidth + 300,
    bottompipeY: bottompipeY,
    bottompipeHeight: randomHeight(-150, -270),
    passed: false,
  });
}


// function pour animer les tuyaux pour qu'ils bougent et s'oscillent
function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].toppipeHeight += pipeOscillationSpeed;
    if (pipes[i].toppipeHeight < 500 || pipes[i].toppipeHeight > 230) {
      pipeOscillationSpeed = -pipeOscillationSpeed;
    }

    pipes[i].bottompipeHeight += pipeOscillationSpeed;
    if (pipes[i].bottompipeHeight < -270 || pipes[i].bottompipeHeight > -150) {
      pipeOscillationSpeed = -pipeOscillationSpeed;
    }

    context.drawImage(toppipe, pipes[i].toppipeX, pipes[i].toppipeY, toppipeWidth, pipes[i].toppipeHeight);
    context.drawImage(bottompipe, pipes[i].bottompipeX, pipes[i].bottompipeY, bottompipeWidth, pipes[i].bottompipeHeight);

    pipes[i].toppipeX -= toppipeSpeed;
    pipes[i].bottompipeX -= bottompipeSpeed;

    if (pipes[i].toppipeX + toppipeWidth < player1X && !pipes[i].passed) {
      score += 1;
      pipes[i].passed = true;
    }

    if (pipes[i].toppipeX + toppipeWidth < 0) {
      pipes[i].toppipeX = boardWidth;
      pipes[i].toppipeHeight = randomHeight(100, 230);
      pipes[i].passed = false;
    }

    if (pipes[i].bottompipeX + bottompipeWidth < 0) {
      pipes[i].bottompipeX = boardWidth;
      pipes[i].bottompipeHeight = randomHeight(-150, -270);
      pipes[i].passed = false;
    }
  }
}

function drawPlayer1(player) {
  context.drawImage(player1Img, player.x, player.y, player.width, player.height);
}

function randomizePlayerImage() {
  player1Img = new Image();
  player1Img.src = playerImages[Math.floor(Math.random() * playerImages.length)];
}

function drawScore() {
  context.fillStyle = "white";
  context.font = "25px Arial";
  context.fillText("Score: " + score, 10, 50);
}

function checkPlayerPipeCollision() {
  for (let i = 0; i < pipes.length; i++) {
    if (
      player1.x + player1.width > pipes[i].toppipeX &&
      player1.x < pipes[i].toppipeX + toppipeWidth &&
      (player1.y < pipes[i].toppipeHeight || player1.y + player1.height > boardHeight + pipes[i].bottompipeHeight)
    ) {
      gameOver = true;
    }
  }
}
if (gameOver) {
  player1.gravity = 3;
}


function resetPlayerPosition() {
  player1.x = player1X;
  player1.y = player1Y;
  player1.velocity = 0;
}
if (!gameOver) {
  player1.gravity = 0.5;
}

function initCoin() {
  coinX = boardWidth;
  coinY = randomHeight(100, boardHeight - 100);
}

function drawCoin() {
  if (coinVisible) {
    context.drawImage(coin, coinX, coinY, coinWidth, coinHeight);
  }
}

function moveCoin() {
  if (coinVisible) {
    coinX -= coinSpeed;
  }
}

function checkCoinCollision() {
  if (
    player1.x + player1.width > coinX &&
    player1.x < coinX + coinWidth &&
    player1.y < coinY + coinHeight &&
    player1.y + player1.height > coinY
  ) {
    coinVisible = false;
    score += 2;
    initCoin();
    coinVisible = true;
  }
}

function resetGame() {
  player1.x = player1X;
  player1.y = player1Y;
  player1.velocity = 0;
  score = 0;
  gameOver = false;
  pipes = [];
  initPipes();
  initCoin();
  randomizePlayerImage();
  gameOversound.play();
}

function startGame() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();

  backgroundmusic.addEventListener('ended', function () {
    backgroundmusic.currentTime = 0; // Reset the music to the beginning
    backgroundmusic.play(); // Replay the background music
  });

  board = document.getElementById("background");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  randomizePlayerImage();

  initPipes();
  initCoin();

  context.drawImage(background, 0, 0, boardWidth, boardHeight);
  drawPlayer1(player1);

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      if (gameOver) {
        resetGame();
      } else {
        player1.velocity = -10;
        jumpsound.play();
      }
    }
  });

  const startButton = document.getElementById("startButton");

  startButton.addEventListener("click", function () {
    backgroundmusic.play();
  });

  setInterval(function () {
    if (!gameOver) {
      player1.velocity += player1.gravity;
      player1.y += player1.velocity;

      backgroundX -= 1;

      if (backgroundX < -boardWidth) {
        backgroundX = 0;
      }

      context.clearRect(0, 0, boardWidth, boardHeight);

      context.drawImage(background, backgroundX, 0, boardWidth, boardHeight);
      context.drawImage(background, backgroundX + boardWidth, 0, boardWidth, boardHeight);

      drawPipes();
      drawPlayer1(player1);
      drawScore();
      checkPlayerPipeCollision();

      drawCoin();
      moveCoin();
      checkCoinCollision();
    } else {
      context.fillStyle = "white";
      context.font = "36px Arial";
      context.fillText("Game Over", boardWidth / 2 - 100, boardHeight / 2);
      oscillator.stop();
    }
  }, 1000 / 60);
}

startGame();

let stopButton = document.createElement("button");
stopButton.innerHTML = "Stop Music";
stopButton.style.position = "absolute";
stopButton.style.top = "10px";
stopButton.style.right = "10px";
document.body.appendChild(stopButton);

stopButton.addEventListener("click", function () {
  backgroundmusic.pause();
});


const modeButton = document.getElementById("modeButton");

modeButton.addEventListener("click", function () {
  if (pipeOscillationSpeed === 0) {
    pipeOscillationSpeed = 0.5;
    modeButton.textContent = "Hard Mode";
  } else {
    pipeOscillationSpeed = 0;
    modeButton.textContent = "Easy Mode";
  }
});




