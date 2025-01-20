let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/eat.mp3');
const bgm = new Audio('music/bgm.mp3');
// const gameOver= new Audio('game-over.mp3');
// const gameStart = new Audio('game-start.mp3');
const dirnChange = new Audio('music/hiss.mp3');
const loseMusic = new Audio('music/lose_music.mp3');
let speed = 13;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  {x: 1, y: 2}
]

let food = {x: 13, y: 15};


function setDifficulty() {
  const level = prompt("Choose difficulty: Easy, Medium, or Hard").toLowerCase();
  switch (level) {
    case "easy":
      speed = 7;
      break;
    case "medium":
      speed = 10;
      break;
    case "hard":
      speed = 19;
      break;
    default:
      alert("Invalid choice! Defaulting to Medium.");
      speed = 10;
  }
}
setDifficulty();

//Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000 < 1/speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
          return true;
      }
  }
  // If you bump into the wall
  if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
      return true;
  }
      
  return false;
}
function gameEngine() {
  // Part 1: Updating the snake array & food
  if(isCollide(snakeArr)) {
    loseMusic.play();
    bgm.pause();
    inputDir = {x: 0 , y: 0};
    alert("Game Over. Press any key to play again!");
    setDifficulty();
    snakeArr = [{x: 13 , y: 15}];
    bgm.play();
    score = 0;
  }

   if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HighScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].x + inputDir.y})
    let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
   }  

   //Moving the snake
   for (let i = snakeArr.length - 2; i >= 0; i--){
    snakeArr[i+1] = {...snakeArr[i]};
   }

   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;
  //Part 2: Render the snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, index)=>{
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0){
      snakeElement.classList.add('head');
  }
  else{
      snakeElement.classList.add('snake');
  }
    board.appendChild(snakeElement);
  });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}









//Main Function
bgm.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
  // inputDir = {x: 0 , y: 1} // Start the game
  dirnChange.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default: 
      inputDir.x = 0;
      inputDir.y = 0;
      break;
  }
});



