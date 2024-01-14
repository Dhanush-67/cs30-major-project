// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ghost;
let playerImg;
let playerDownImg;
let playerUpImg;
let playerLeftImg;
let playerRightImg;

function preload() {
  playerImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker (4).gif");
  playerDownImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker (2).gif");
  playerUpImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker.gif");
  playerLeftImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker (3).gif");
  playerRightImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker (1).gif");
}

function setup(){
  new Canvas();
  ghost = new Sprite();
  ghost.addAni("idle",playerImg);
  ghost.addAni("movingDown", playerDownImg);
  ghost.addAni("movingUp", playerUpImg);
  ghost.addAni("movingLeft", playerLeftImg);
  ghost.addAni("movingRight", playerRightImg);
}

function draw(){
  background("white");

  if (kb.pressing("up")){
    ghost.changeAni("movingUp");
  } 
  else{
    ghost.changeAni("idle");
  }
  if (kb.pressing("right")){
    ghost.changeAni("movingRight");
  }
  if (kb.pressing("left")){
    ghost.changeAni("movingLeft");
  } 
  if (kb.pressing("down")){
    ghost.changeAni("movingDown");
  } 
}