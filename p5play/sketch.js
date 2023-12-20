// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let Spaceship;

function preload() {
  bg = loadImage("Assets/Images/space bg.png");
}

function setup(){
  new Canvas();
  world.friction = 1;
  createSpaceship(width/2,height/2,50,50,);
  
}

function draw() {
  clear();
  background(bg);
  //Spaceship.updateMovement();
  spaceshipControls();
}

//Spaceship stuff
function createSpaceship(x,y,w,h){
  Spaceship = new Sprite(x, y, w, h);
  Spaceship.addImage("Assets/Images/SHIP.png");


  // Spaceship.updateMovement = function() {
  //   if (kb.pressing('up')){
  //     Spaceship.direction = Spaceship.rotation - 90;
  //     if(Spaceship.speed < 10)
  //     Spaceship.speed += 0.2;
  //     console.log(Spaceship.vel.y);
  //   } 
  //   else{
  //     if (Spaceship.speed > 0) {
  //       Spaceship.speed *= 0.95;
  //     }
  //   } 
  //   if (kb.pressing('right')) Spaceship.rotation += 5;
  //   if (kb.pressing('left')) Spaceship.rotation -= 5;
  // };
}


//when we press "w" speed gets added to the spacship until its speed reaches 10 after which no more 
// speed is added to the spaceship.Whatever speed it has gained it will have that speed. When "w" is
// released then we multiply speed by a decimal number which acts as friction.
function spaceshipControls(){
  if (kb.pressing('up')){
    Spaceship.direction = Spaceship.rotation-90;
    if(Spaceship.speed < 10){
    Spaceship.speed += 0.2;
    }
  } 

  else{
    if (Spaceship.speed > 0) {
      Spaceship.speed *= 0.97;
    }
  } 

  if (kb.pressing('right')) Spaceship.rotation += 5;
  if (kb.pressing('left')) Spaceship.rotation -= 5;
}


