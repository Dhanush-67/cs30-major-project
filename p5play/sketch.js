// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let Spaceship;

function setup(){
  createCanvas(windowWidth, windowHeight);
  createSpaceship(width/2,height/2,50,50,);
  
}

function draw() {
  clear();
  spaceshipControls();
  camera.x = Spaceship.x;
  camera.y = Spaceship.y;

}

//Spaceship stuff
function createSpaceship(x,y,w,h){
  Spaceship = new Sprite(x, y, w, h);
  Spaceship.addImage("SHIP.png");
  //Spaceship.maxSpeed = 5;
}

function spaceshipControls(){
  if (kb.pressing('up')){
    Spaceship.addSpeed(0.1, Spaceship.rotation-90);
    // Spaceship.bearing = Spaceship.rotation-90;
    // Spaceship.applyForce(100);
    console.log(Spaceship.vel.y);
  } 
  else{
    Spaceship.vel.y = 0;
    Spaceship.vel.x = 0;
  } 
  if (kb.pressing('right')) Spaceship.rotation += 5;
  if (kb.pressing('left')) Spaceship.rotation -= 5;
}


