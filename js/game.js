window.onload = init;

// объявдяем переменные
var container;
var headerTitle
var body;
var containerCard;
var containerCard2;
var card;
var cardClose;

var card;

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

var GAME_WIDTH = 1200;
var GAME_HEIGHT = 600;

var STAR_COORD_BALL_X = 600;
var STAR_COORD_BALL_Y = 540;

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
  container = document.querySelector('.container-cvs');
  headerTitle = document.querySelector('.header__title');
  body = document.querySelector('body');
  containerCard = document.querySelector('.container-card');
  containerCard2 = document.querySelector('.contain-card2');

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

  map.width = GAME_WIDTH;
  map.height = GAME_HEIGHT;
  ball.width = GAME_WIDTH;
  ball.height = GAME_HEIGHT;
  goalkeeper.width = GAME_WIDTH;
  goalkeeper.height = GAME_HEIGHT;
  markCvs.width = GAME_WIDTH;
  markCvs.height = GAME_HEIGHT;
  title.width = GAME_WIDTH;
  title.height = GAME_HEIGHT;

  ctxTitle.fillStyle = "#ffffff";
  ctxTitle.font = 'bold 24px sans-serif';

  resume = document.querySelector('.resume');
  game = document.querySelector('.game');
  resume.addEventListener('click', openResume);
  game.addEventListener('click', openGame);
  
  document.addEventListener('keydown', checkKeyDown);
  document.addEventListener('keyup', checkKeyUp);
  document.addEventListener('mousemove', mouseMove);
  container.addEventListener('click', mouseClick);

  player = new Player();
  goalkeeper = new Goalkeeper();
  mark = new Mark();

  drawBg();
  startLoop();
  updateTitles();

}

//движение мыши 
function mouseMove(evt) {
  mouseX = evt.pageX - map.offsetLeft;
  mouseY = evt.pageY - map.offsetTop;
}
//клик мыши
function mouseClick(evt) {
  player.drawX = mouseX - player.width;
  player.drawY = mouseY - player.height;
};
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
  player.boom();
  player.update();
  //player.boom();
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
 // проверка на столкновение
  Player.prototype.boom = function(evt) {  
    if ((this.drawX >= mark.drawX) && (this.drawY >= mark.drawY) &&
      (this.drawX <= mark.drawX + mark.width - 50) && (this.drawY <= mark.drawY + mark.height - 50)) {
        this.drawX = STAR_COORD_BALL_X;
        this.drawY = STAR_COORD_BALL_Y;
        containerCard.innerHTML = `
        <div class="card card-skills">
        <div class="card-header">
        <h2 class="card-title">Навыки</h2>
        <button class="card-close">&#10006;</button>
        </div>
        <div class="card-description skills">
          <img src="img/html_css_js.png" class="skills-photo" alt="HTML, CSS, JS"> 
          <img src="img/git.png" class="skills-photo" alt="Git"> 
          <img src="img/github.png" class="skills-photo github-photo" alt="GitHub">
          <img src="img/kbr_adap.png" class="skills-photo cross-photo" alt="Adaptive Cross-browser">
          <img src="img/sass_less.png" class="skills-photo pre-photo" alt="Sass Less">
          <img src="img/gulp.png" class="skills-photo gulp-photo" alt="Gulp">
          <img src="img/avocode.png" class="skills-photo" alt="Avacode">
          <img src="img/figma.png" class="skills-photo" alt="Figma">
          <img src="img/ps.png" class="skills-photo" alt="Photoshop">      
        </div>
        <div class="card-description skills">
          <img src="img/cooperation.png" class="soft-skills-photo" alt="team">
          <img src="img/communicate.png" class="soft-skills-photo" alt="communicate">
          <img src="img/listener.png" class="soft-skills-photo" alt="listener">
          <img src="img/speech.png" class="soft-skills-photo" alt="speech">
          <img src="img/respect.png" class="soft-skills-photo" alt="respect">
          <img src="img/leadership.png" class="soft-skills-photo" alt="leadership">
          <img src="img/creative.png" class="soft-skills-photo" alt="creative">
          <img src="img/humor.png" class="soft-skills-photo" alt="humor"> 
        </div>
        <div class="card-description skills">
          <img src="img/leaguage.png" class="lang-photo" alt="leaguage"> 
        </div>
        </div>
       `
       modalCard();
    }
    if (this.drawX > (mark.drawX + 850) && this.drawY > (mark.drawY - 140) &&
      this.drawX < (mark.drawX + 850) + mark.width - 50 && this.drawY < (mark.drawY - 140) + mark.height - 50) {
        this.drawX = STAR_COORD_BALL_X;
        this.drawY = STAR_COORD_BALL_Y;
    }
    if (this.drawX > (mark.drawX + 850) && this.drawY > mark.drawY &&
    this.drawX < (mark.drawX + 850) + mark.width - 50 && this.drawY < mark.drawY + mark.height - 50) {
      this.drawX = STAR_COORD_BALL_X;
      this.drawY = STAR_COORD_BALL_Y;
    }
    if (this.drawX > mark.drawX && this.drawY > (mark.drawY - 140) &&
    this.drawX < mark.drawX + mark.width - 50 && this.drawY < (mark.drawY - 140) + mark.height - 50) {
      this.drawX = STAR_COORD_BALL_X;
      this.drawY = STAR_COORD_BALL_Y;
      containerCard.innerHTML = `
      <div class="card card-aducation">
      <div class="card-header">
      <h2 class="card-title">Образование</h2>
      <button class="card-close">&#10006;</button>
      </div>
     <div class="card-description">
        <p class="card-name">Московский государственный университет инженерной экологии, Москва</p>
       <ul class="card-list">
          <li class="card-item">2005 - 2010г.г.</li>
          <li class="card-item">Инженер проектировщик машин для химических производств</li>
        </ul>
      </div>
      <div class="card-description">
        <p class="card-name">SBA (Student of Business Administration) programme 2013</p>
        <ul class="card-list">
          <li class="card-item">2013 г.</li>
          <li class="card-item">Ассоциация Менеджеров России, Маркетинг</li>
        </ul>
      </div>
      <div class="card-description">
        <p class="card-name">HTML Academy</p>
        <ul class="card-list">
          <li class="card-item">2019-2020г.г.</li>
           <li class="card-item">Frontend-разработчик</li>
          </ul>
          <div class="card-sertificates">
          <img class="sertificate-photo" src="img/html.jpg" alt="sertificate of HTML/CSS 1 level">
          <img class="sertificate-photo" src="img/html2.jpg" alt="sertificate of HTML/CSS 2 level">
          <img class="sertificate-photo" src="img/js.jpg" alt="sertificate of JS">
        </div>
        </div>
        </div>
    ` 
    modalCard();
    }
    if (this.drawX > goalkeeper.drawX && this.drawY > goalkeeper.drawY &&
    this.drawX < goalkeeper.drawX + (goalkeeper.width - 50) && this.drawY < goalkeeper.drawY + (goalkeeper.height - 50)) {
      this.drawX = STAR_COORD_BALL_X;
      this.drawY = STAR_COORD_BALL_Y;
      containerCard.innerHTML = `
      <div class="container">
        <div class="card card-aboutme">
          <div class="card-header">
          <h2 class="card-title">Обо мне</h2>
          <button class="card-close">&#10006;</button>
          </div>
        <img class="card-photo" src="img/my-photo.jpg" name="my photo">
        <div class="card-description">
          <p class="card-name">Карпов Лев Николаевич</p>
          <ul class="card-list">
              <li class="card-item">Мне 32 года. Родился 18.12.1987г.</li>
              <li class="card-item">Есть успешный, учебный опыт верстки в HTML academy. Сейчас изучаю JS. Имею огромное желание развиваться в
                Frontend, однако мало опыта в этом.</li>
              <li class="card-item">Готов рассмотреть варианты со стажеровкой, т.к. понимаю, что мой опыт совсем не большой, а даже
                минимальный.</li>
              <li class="card-item">Люблю футбол! Любимый клуб Спартак Москва, из зарубежных болею за Реал Мадрид.</li>
              <li class="card-item">Три любимых футболиста:<br>1. Рауль 2. Дэвид Бэкхем 3. Франческо Тотти</li>
              <li class="card-item">Долго и успешно занимался самбо и дзюдо (КМС). Сейчас занимаюсь, для поддержания формы в домашних
                усллвиях.</li>
              <li class="card-item">Люблю читать.</li>
              <li class="card-item">Свободное время провожу семьей, у меня двое маленьких сыновей и это самое главное счастье.</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
         `
      modalCard();
    }

}

//перемещение мяча по канвасу
Player.prototype.update = function() {
  if (this.drawX <= 0) this.drawX = 0;
  if (this.drawX > GAME_WIDTH - this.width) this.drawX = GAME_WIDTH - this.width;
  if (this.drawY <= 0) this.drawY = 0;
  if (this.drawY > GAME_HEIGHT - this.height) this.drawY = GAME_HEIGHT - this.height;
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
  ctxBall.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

// открывет резюме
function openResume() {
  container.classList.add('hidden');
  resume.classList.add('hidden');
  game.classList.remove('hidden');
  headerTitle.classList.add('hidden');
};
//отрывает игру
function openGame() {
  container.classList.remove('hidden');
  resume.classList.remove('hidden');
  game.classList.add('hidden');
  headerTitle.classList.remove('hidden');
}
// закрывате информацию из резюме в игре
function closeCard() {
  card.classList.add('hidden');
}
// надписи в игре
function updateTitles() {
  ctxTitle.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctxTitle.fillText("Обо мне", 590, 470);
  ctxTitle.fillText("Навыки", 140, 470);
  ctxTitle.fillText("Образование", 140, 175);
  ctxTitle.fillText("Мои работы", 965, 175);
  ctxTitle.fillText("Контакты", 995, 470);
}

function modalCard() {
  cardClose = containerCard.querySelector('.card-close');
  card = containerCard.querySelector('.card');  
  cardClose.addEventListener('click', closeCard);
}
// рисует фон игры
function drawBg() {
  ctxMap.drawImage(bgGame, 0, 0, 600, 400, //размеры картинки
    0, 0, GAME_WIDTH, GAME_HEIGHT);//размеры на которые надо растянуть
};