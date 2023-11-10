let board;
let boardWidth = 600;
let boardHeight = 640;
let context;

let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;

let background1 = new Image();
background1.src = "img/backgroundnew1.jpg";

let background2 = new Image();
background2.src = "img/backgroundnew2.jpg";

let background3 = new Image();
background3.src = "img/backgroundnew3.jpg";

let background4 = new Image();
background4.src = "img/backgroundnew4.jpg";

let backgroundX = 0;
let backgrounds = [background1, background2, background3, background4];

// let deathSound = new Audio();
// deathSound.src = "sounds/zemm.mp3";

let player1Width = 90;
let player1Height = 80;
let player1X = boardWidth / 8;
let player1Y = boardHeight / 2;
let player1Velocity = 0;
let player1Gravity = 0.5;

let player1 = {
  x: player1X,
  y: player1Y,
  width: player1Width,
  height: player1Height,
  velocity: 0,
  gravity: 0.5
};

let toppipe = new Image();
toppipe.src = "img/toppipe.png";

let bottompipe = new Image();
bottompipe.src = "img/bottompipe.png";

<<<<<<< HEAD
let musicSound = new Audio();
musicSound.src = "sounds/music.mp3";
musicSound.loop = true;
const button = document.querySelector("#onoff");

const karim = document.querySelector("#karim");

const antonin = document.querySelector("#antonin");

button.addEventListener("click", function () {
  button.blur();
  if (musicSound.paused) {
    musicSound.play();
    button.textContent = "Son: ON";
    button.style.backgroundColor = "#fbeee0";
  } else {
    musicSound.pause()
    button.textContent = "Son: OFF";
    button.style.backgroundColor = "rgb(244, 64, 64)";
  }
});

karim.addEventListener("click", function () {
  karim.blur();
  musicSound.src = musicKarim.src;
  musicSound.play();
});

antonin.addEventListener("click", function () {
  antonin.blur();
  musicSound.src = musicAntonin.src;
});



const restart = document.querySelector("#restart");

restart.addEventListener("click", function () {
  restart.blur();
  toppipeSpeed = 0;
  bottompipeSpeed = 0;
  gameIsRunning = false;
  resetGame();
  startGame();
});

const modeButton = document.getElementById("modeButton");
modeButton.addEventListener("click", function () {
  modeButton.blur();
  if (pipeOscillationSpeed === 0) {
    pipeOscillationSpeed = pipeOscillationSpeedON;
    modeButton.textContent = "Hard Mode";
    modeButton.style.backgroundColor = "rgb(244, 64, 64)";
  } else {
    pipeOscillationSpeed = 0;
    modeButton.textContent = "Easy Mode";
    modeButton.style.backgroundColor = "#fbeee0";
  }
});



function randomHeight(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// let toppipeWidth = 40;
let toppipeHeight = randomHeight(100, 230);
let toppipeSpeed = 5;
let toppipeX = boardWidth;
let toppipeY = 0;

let bottompipeHeight = randomHeight(-150, -270);
let bottompipeX = boardWidth;
let bottompipeY = 640;

let bottompipeSpeed = 0;

let pipeOscillationRange = 40;
let pipeOscillationSpeed = 0;

let pipes = [];

function initPipes() {
  pipes.push({
    toppipeX: boardWidth,
    toppipeY: 0,
    toppipeHeight: randomHeight(100, 230),
    bottompipeX: boardWidth,
    bottompipeY: bottompipeY,
    bottompipeHeight: randomHeight(-150, -240),
    passed: false
=======
    toppipeHeight: randomHeight(100, 330),
    bottompipeX: boardWidth,
    bottompipeY: bottompipeY,
    bottompipeHeight: bottompipeHeight,
    passed: false, // Nouvelle propriété pour marquer le tuyau comme non passé
>>>>>>> 07faabe617b6b1b26e2c176efec0d3b11f102eb8
  });

  pipes.push({
    toppipeX: boardWidth + 300,
    toppipeY: 0,
    toppipeHeight: randomHeight(150, 290),
    bottompipeX: boardWidth + 300,
    bottompipeY: bottompipeY,
    bottompipeHeight: randomHeight(-150, -270),
    passed: false
  });
}

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
<<<<<<< HEAD
      score += 1;
      pipes[i].passed = true;
=======
      // Le joueur a passé ce tuyau
      score += 1; // Incrémente le score de 1 à chaque passage de tuyau
      pipes[i].passed = true; // Marque le tuyau comme passé
>>>>>>> 07faabe617b6b1b26e2c176efec0d3b11f102eb8
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
=======
      pipes[i].bottompipeHeight = bottompipeHeight
>>>>>>> 07faabe617b6b1b26e2c176efec0d3b11f102eb8
    }
  }
}

function drawPlayer1(player) {
  context.drawImage(player1Img, player.x, player.y, player.width, player.height);
}

function checkPlayerPipeCollisions(player, pipes) {
  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];

    // Vérifiez la collision avec le haut du tuyau
    if (
      player.x + player.width > pipe.toppipeX &&
      player.x < pipe.toppipeX + toppipeWidth &&
      player.y < pipe.toppipeY + pipe.toppipeHeight
    ) {
      return true;
    }

    // Vérifiez la collision avec le bas du tuyau
    if (
      player.x + player.width > pipe.bottompipeX &&
      player.x < pipe.bottompipeX + bottompipeWidth &&
      player.y + player.height > boardHeight + pipe.bottompipeHeight
    ) {
      return true;
    }
  }
  return false;
}



window.onload = function () {
  board = document.getElementById("background");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");


  player1Img = new Image();
  player1Img.src = "img/player1.png";

  player2Img = new Image();
  player2Img.src = "img/player2.png";

  player3Img = new Image();
  player3Img.src = "img/player3.png";

  player4Img = new Image();
  player4Img.src = "img/player4.png";

  player1.width = 60;
  player1.height = 50;

  let players = [player1Img, player2Img, player3Img, player4Img];
  let currentPlayerImg = players[Math.floor(Math.random() * players.length)];


  toppipe = new Image();
  toppipe.src = "img/toppipe.png";

  bottompipe = new Image();
  bottompipe.src = "img/bottompipe.png";

  initPipes();

  let randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  context.drawImage(randomBackground, 0, 0, boardWidth, boardHeight);
  drawPlayer1(player1);

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      player1.velocity = -10;
    }
  });

  document.getElementById("background").style.backgroundImage = `url('${randomBackground.src}')`;


  // ... (autres parties de votre code)


  setInterval(function () {

    if (gameIsRunning) {
      player1.velocity += player1.gravity;
      player1.y += player1.velocity;
      toppipeSpeed = 5;
      bottompipeSpeed = 5;
      backgroundX += -1;

      if (backgroundX < -boardWidth) {
        backgroundX = 0;
      }

      if (player1.y > boardHeight) {
        gameOver();
      }

      if (checkPlayerPipeCollisions(player1, pipes)) {
        gameOver();
      }



      for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];

        if (pipe.toppipeX + toppipeWidth < player1.x && !pipe.passed) {
          score++;
          pipe.passed = true;
        }
      }
    }
    context.drawImage(randomBackground, backgroundX, 0, boardWidth, boardHeight);
    context.drawImage(randomBackground, backgroundX + boardWidth, 0, boardWidth, boardHeight);
    drawPipes();
    drawScore();
    drawPlayer1(player1);
    context.drawImage(SelectedPlayerImg, player1.x, player1.y, player1.width, player1.height);



  }, 1000 / 60);

}

function resetGame() {
  // deathSound.play();
  player1.y = player1Y;
  player1.velocity = 0;
  player1.gravity = 0.5;

  pipes = [];

  initPipes(); // Réinitialisez les tuyaux ici

  score = 0;
}