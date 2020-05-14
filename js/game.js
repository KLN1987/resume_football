window.onload = init;

// объявдяем переменные
var container;

var map;
var ctxMap;

var ball;
var ctxBall;

var goalkeeper;
var ctxGoalkeeper;

var markCvs;
var ctxMark;

var title;
var ctxTitle;

var resume;
var game;

//var gameWidth;
//var gameHeight;
var gameWidth = 1200;
var gameHeight = 600;

var bgGame = new Image();
bgGame.src = 'img/gates.jpg';

var ballGame = new Image();
ballGame.src = 'img/sprite-game.png';

var player;
var goalkeeper;
var marks;

var isPlaying;

var mouseX;
var mouseY;

// поддержка браузеров
var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame;


//игра
function init() {
  // resize();
  container = document.querySelector('.container-cvs');

  map = document.querySelector('.map');
  ctxMap = map.getContext('2d');

  ball = document.querySelector('.ball');
  ctxBall = ball.getContext('2d');

  goalkeeper = document.querySelector('.goalkeeper');
  ctxGoalkeeper = goalkeeper.getContext('2d');

  markCvs = document.querySelector('.mark');
  ctxMark = goalkeeper.getContext('2d');

  title = document.querySelector('.title');
  ctxTitle = title.getContext('2d');

  map.width = gameWidth;
  map.height = gameHeight;
  ball.width = gameWidth;
  ball.height = gameHeight;
  goalkeeper.width = gameWidth;
  goalkeeper.height = gameHeight;
  markCvs.width = gameWidth;
  markCvs.height = gameHeight;
  title.width = gameWidth;
  title.height = gameHeight;

  ctxTitle.fillStyle = "#ffffff";
  ctxTitle.font = 'bold 24px sans-serif';

  resume = document.querySelector('.resume');
  game = document.querySelector('.game');
  resume.addEventListener('click', openResume);
  game.addEventListener('click', openGame);
  
  document.addEventListener('keydown', checkKeyDown);
  document.addEventListener('keyup', checkKeyUp);
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('click', mouseClick);

  player = new Player();
  goalkeeper = new Goalkeeper();
  mark = new Mark();

  drawBg();
  startLoop();
  updateTitles();
}

/*function resize() {
  if (window.innerWidth < 640 ) {
    gameWidth = 320;
    gameHeight = 320;
  } else if (window.innerWidth < 1200) {
    gameWidth = 600;
    gameHeight = 400;
  } else {
    gameWidth = 1200;
    gameHeight = 600;
  }
}*/

//движение мыши 
function mouseMove(evt) {
  mouseX = evt.pageX - map.offsetLeft;
  mouseY = evt.pageY - map.offsetTop;

  document.querySelector('.header').innerHTML = "X: " + mouseX + " Y: " + mouseY;
}

function mouseClick(evt) {

  player.drawX = mouseX - player.width/2;
  player.drawY = mouseY - player.height/2;

  document.querySelector('.header').innerHTML = "Clicked";

}

//движение мяча
function loop() {
  if (isPlaying) { //если играем
    draw();
    update();
    requestAnimFrame(loop);
  }
}
// начало
function startLoop() {
  isPlaying = true;
  loop();
}
// конец
function stopLoop() {
  isPlaying = false;
}

//рисуем все объекты
function draw() {
  player.draw();
  goalkeeper.draw();
  mark.draw();
}

function update() {
  player.update();
}

// функция с данными про объект, которым играем(мяч)
function Player() {
  this.srcX = 0;
  this.srcY = 0;
  this.drawX = 600;
  this.drawY = 540;
  this.width = 50;
  this.height = 50;
  this.speed = 3;

  //for key
  this.isUp = false;
  this.isDown = false;
  this.isLeft = false;
  this.isRight = false;
}

//создаем данные, координаты по голкиперу
function Goalkeeper() {
  this.srcX = 0;
  this.srcY = 300;
  this.drawX = 550;
  this.drawY = 260;
  this.width = 150;
  this.height = 180;
}
//создаем данные, координаты по мешени 
function Mark() {
  this.srcX = 0;
  this.srcY = 120;
  this.drawX = 150;
  this.drawY = 340;
  this.width = 110;
  this.height = 110;
}

//рисуем мяч  
Player.prototype.draw = function () {
  clearCtxBall();
  ctxBall.drawImage(ballGame, this.srcX, this.srcY, this.width, this.height, 
    this.drawX, this.drawY, this.width, this.height);
}

// рисуем голкипера 
Goalkeeper.prototype.draw = function () {
  ctxMap.drawImage(ballGame, this.srcX, this.srcY, this.width, this.height, 
    this.drawX, this.drawY, this.width, this.height);
}

// рисуем мишени 
Mark.prototype.draw = function () {
  ctxMark.drawImage(ballGame, this.srcX, this.srcY, this.width, this.height, 
    this.drawX, this.drawY, this.width, this.height);
  ctxMark.drawImage(ballGame, this.srcX, this.srcY, this.width, this.height, 
      this.drawX, this.drawY - 140, this.width, this.height);
  ctxMark.drawImage(ballGame, this.srcX, this.srcY, this.width, this.height, 
      this.drawX + 850, this.drawY, this.width, this.height);
  ctxMark.drawImage(ballGame, this.srcX, this.srcY, this.width, this.height, 
      this.drawX + 850, this.drawY - 140, this.width, this.height);    
}

//перемещение мяча по канвасу
Player.prototype.update = function() {
  if (this.drawX <= 0) this.drawX = 0;
  if (this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
  if (this.drawY <= 0) this.drawY = 0;
  if (this.drawY > gameHeight - this.height) this.drawY = gameHeight - this.height;
  
  // проверка на столкновение
  if ( this.drawX >= mark.drawX && this.drawY >= mark.drawY &&
    this.drawX <= mark.drawX + mark.width - 50 && this.drawY <= mark.drawY + mark.height - 50) {
      console.log("ddd");
  }
  if (this.drawX > (mark.drawX + 850) && this.drawY > (mark.drawY - 140) &&
    this.drawX < (mark.drawX + 850) + mark.width - 50 && this.drawY < (mark.drawY - 140) + mark.height - 50) {
      console.log("aaa");
  }
  if (this.drawX > (mark.drawX + 850) && this.drawY > mark.drawY &&
  this.drawX < (mark.drawX + 850) + mark.width - 50 && this.drawY < mark.drawY + mark.height - 50) {
    console.log("bbb");
  }
  if (this.drawX > mark.drawX && this.drawY > (mark.drawY - 140) &&
  this.drawX < mark.drawX + mark.width - 50 && this.drawY < (mark.drawY - 140) + mark.height - 50) {
    console.log("ccc");
  }
  if (this.drawX > goalkeeper.drawX && this.drawY > goalkeeper.drawY &&
  this.drawX < goalkeeper.drawX + goalkeeper.width - 50 && this.drawY < goalkeeper.drawY + goalkeeper.height - 50) {
    console.log("eee");
  }

  this.chooseDirection();
}
//напрявляющие мяча
Player.prototype.chooseDirection = function() {
  if (this.isUp) this.drawY -= this.speed;
  if (this.isDown) this.drawY += this.speed;
  if (this.isLeft) this.drawX -= this.speed;
  if (this.isRight) this.drawX += this.speed;
}
// движение на стрелках для мяча
function checkKeyDown(evt) {
  if (evt.key === 'ArrowUp') {
    player.isUp = true;
    evt.preventDefault();
  }
  if (evt.key === 'ArrowDown') {
    player.isDown = true;
    evt.preventDefault();
  }
  if (evt.key === 'ArrowLeft') {
    player.isLeft = true;
    evt.preventDefault();
  }
  if (evt.key === 'ArrowRight') {
    player.isRight = true;
    evt.preventDefault();
  }
}

function checkKeyUp(evt) {
  if (evt.key === 'ArrowUp') {
    player.isUp = false;
    evt.preventDefault();
  }
  if (evt.key === 'ArrowDown') {
    player.isDown = false;
    evt.preventDefault();
  }
  if (evt.key === 'ArrowLeft') {
    player.isLeft = false;
    evt.preventDefault();
  }
  if (evt.key === 'ArrowRight') {
    player.isRight = false;
    evt.preventDefault();
  }
}

//очищаем хвост отрисовки (прямоугольную область)
function clearCtxBall() {
  ctxBall.clearRect(0, 0, gameWidth, gameHeight);
}

// открывет резюме
function openResume() {
  container.classList.add('hidden');
  resume.classList.add('hidden');
  game.classList.remove('hidden');
};
//отрывает игру
function openGame() {
  container.classList.remove('hidden');
  resume.classList.remove('hidden');
  game.classList.add('hidden');
}

function updateTitles() {
  ctxTitle.clearRect(0, 0, gameWidth, gameHeight);
  ctxTitle.fillText("Обо мне", 590, 470);
  ctxTitle.fillText("Навыки", 140, 470);
  ctxTitle.fillText("Образование", 140, 175);
  ctxTitle.fillText("Мои работы", 965, 175);
  ctxTitle.fillText("Контакты", 995, 470);
  //ctxTitle.strokeText("Контакты", 1000, 470);
}
// рисует фон игры
function drawBg() {
  ctxMap.drawImage(bgGame, 0, 0, 600, 400, //размеры картинки
    0, 0, gameWidth, gameHeight);//размеры на которые надо растянуть
};