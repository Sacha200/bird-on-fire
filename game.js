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

let deathSound = new Audio();
deathSound.src = "sounds/zemm.mp3";

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
  velocity: player1Velocity,
  gravity: player1Gravity,
};

let toppipe = new Image();
toppipe.src = "img/toppipe.png";

let bottompipe = new Image();
bottompipe.src = "img/bottompipe.png";

let musicSound = new Audio();
musicSound.src = "sounds/music.mp3";
musicSound.loop = true;

let musicAntonin = new Audio();
musicAntonin.src = "sounds/music.mp3";
musicAntonin.loop = true;

let musicKarim = new Audio();
musicKarim.src = "sounds/karim.mp3";
musicKarim.loop = true;

let globalData;

let toppipeWidth;
let bottompipeWidth;
let pipeOscillationSpeedON;
let backgroundurl;

function getNames() {
  return new Promise((resolve, reject) => {
    fetch('getName.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        globalData = data;
        toppipeWidth = data[0].width;
        bottompipeWidth = data[0].width;
        pipeOscillationSpeedON = data[0].hSpeed;
        backgroundurl = data[0].background;
        resolve(data);
        console.log(toppipeWidth)
      })
      .catch((error) => {
        console.log('There has been a problem:', error);
        reject(error);
      });
  });
}

getNames()
  .then(() => {
    drawPipes();
  })
  .catch((error) => {
    console.log(error);
  });


document.onkeydown = function (event) {
  if (event.code === "Space") {
    event.preventDefault();
  }
};

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
if (karim != undefined) {
  karim.addEventListener("click", function () {
    karim.blur();
    musicSound.src = musicKarim.src;
    musicSound.play();
  });
}


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
let toppipeSpeed = 0;
let toppipeX = boardWidth;
let toppipeY = 0;

let bottompipeHeight = randomHeight(-150, -270);
let bottompipeX = boardWidth;
let bottompipeY = 640;

let bottompipeSpeed = 0;

let pipeOscillationRange = 40;
let pipeOscillationSpeed = 0;

let pipes = [];

let gameIsRunning = false;

function startGame() {

  const message = document.createElement("div");
  message.textContent = "Appuyer sur espace pour jouer";

  message.style.textAlign = "center";
  message.style.verticalAlign = "middle";

  message.style.position = "absolute";
  message.style.left = "50%";
  message.style.top = "50%";
  message.style.color = "white";
  message.style.fontSize = "40px";
  message.style.transform = "translate(-50%, -50%)";

  document.body.appendChild(message);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      gameIsRunning = true;
      message.remove();
    }
  });
}
startGame();

let gameisOver = false;

function gameOver() {
  const msgGameOver = document.createElement("div");
  msgGameOver.textContent = "Game Over ! Score: " + score;
  msgGameOver.style.position = "absolute";
  msgGameOver.style.left = "50%";
  msgGameOver.style.top = "50%";
  msgGameOver.style.color = "white";
  msgGameOver.style.fontSize = "40px";
  msgGameOver.style.transform = "translate(-50%, -50%)";

  const msgBestScore = document.createElement("div");
  msgBestScore.textContent = "Meilleur score: " + bestScore;
  msgBestScore.style.position = "absolute";
  msgBestScore.style.left = "50%";
  msgBestScore.style.top = "60%";
  msgBestScore.style.color = "white";
  msgBestScore.style.fontSize = "40px";
  msgBestScore.style.transform = "translate(-50%, -50%)";


  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
  }

  document.body.appendChild(msgGameOver);
  document.body.appendChild(msgBestScore);
  deathSound.play();

  gameisOver = true;

  setTimeout(function () {
    msgGameOver.remove();
    msgBestScore.remove();
  }
    , 1100);

  // Ajout d'un flou sur l'arrière-plan
  canvas.style.filter = "blur(5px)";

  toppipeSpeed = 0;
  bottompipeSpeed = 0;
  gameIsRunning = false;
  player1.velocity = 0;

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && gameisOver) {
      msgGameOver.remove();
      msgBestScore.remove();
      player1.y = player1Y;
      toppipeSpeed = 0;
      bottompipeSpeed = 0;
      gameIsRunning = true;
      gameisOver = false;
      pipes = [];
      initPipes();
      score = 0;
      canvas.style.filter = "none";
    }
  });

}

function resetGame() {
  player1.y = player1Y;
  player1.velocity = 0;
  player1.gravity = 0.5;
  toppipeSpeed = 0;
  bottompipeSpeed = 0;
  gameIsRunning = false;
  startGame();

  pipes = [];

  initPipes();

  score = 0;
}


function initPipes() {
  pipes.push({
    toppipeX: boardWidth,
    toppipeY: 0,
    toppipeHeight: randomHeight(150, 290),
    bottompipeX: boardWidth,
    bottompipeY: bottompipeY,
    bottompipeHeight: randomHeight(-150, -240),
    passed: false
  });

  pipes.push({
    toppipeX: boardWidth + 300,
    toppipeY: 0,
    toppipeHeight: randomHeight(150, 290),
    bottompipeX: boardWidth + 300,
    bottompipeY: bottompipeY,
    bottompipeHeight: randomHeight(-150, -240),
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
      score += 1;
      pipes[i].passed = true;
    }

    if (pipes[i].toppipeX + toppipeWidth < 0) {
      pipes[i].toppipeX = boardWidth;
      pipes[i].toppipeHeight = randomHeight(100, 260);
      pipes[i].passed = false;
    }

    if (pipes[i].bottompipeX + bottompipeWidth < 0) {
      pipes[i].bottompipeX = boardWidth;
      pipes[i].bottompipeHeight = randomHeight(-150, -240);
      pipes[i].passed = false;
    }
  }
}


const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');


window.onload = function () {


  board = document.getElementById("background");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  playerGreenImg = new Image();
  playerGreenImg.src = "img/playerGreen.png";

  playerBlueImg = new Image();
  playerBlueImg.src = "img/playerBlue.png";

  playerPurpleImg = new Image();
  playerPurpleImg.src = "img/playerPurple.png";

  playerRedImg = new Image();
  playerRedImg.src = "img/playerRed.png";

  playerYellowImg = new Image();
  playerYellowImg.src = "img/playerYellow.png";

  player1.width = 50;
  player1.height = 40;


  let players = [playerGreenImg, playerBlueImg, playerPurpleImg, playerRedImg, playerYellowImg];

  toppipe = new Image();
  toppipe.src = "img/toppipe.png";

  bottompipe = new Image();
  bottompipe.src = "img/bottompipe.png";

  initPipes();


  let randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  context.drawImage(randomBackground, 0, 0, boardWidth, boardHeight);
  document.getElementById("background").style.backgroundImage = `url('${randomBackground.src}')`;

  const carouselImages = document.querySelectorAll(".carousel img");

  carouselImages.forEach((image) => {
    image.addEventListener("click", () => {
      const newBackground = image.getAttribute("src");
      randomBackground.src = newBackground;
    });
  });


  let SelectedPlayerImg = players[Math.floor(Math.random() * players.length)];
  context.drawImage(SelectedPlayerImg, player1.x, player1.y, player1.width, player1.height);


  const carouselPlayerImages = document.querySelectorAll(".players img");

  carouselPlayerImages.forEach((image) => {
    image.addEventListener("click", () => {
      console.log("click");
      const newPlayerImage = image.getAttribute("src");
      SelectedPlayerImg.src = newPlayerImage;
    });
  });



  drawPlayer1(player1);

  if (gameisOver) {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        player1.velocity = 0;
        player1.gravity = 0;
      }
    })
  } else {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        player1.velocity = -10;
      }
    })
  }

  function drawPlayer1(player) {
    context.drawImage(SelectedPlayerImg, player.x, player.y, player.width, player.height);
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

  function drawScore() {
    context.fillStyle = "white";
    context.font = "25px Mina";
    context.fillText("Score: " + score, 10, 34);
  }


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