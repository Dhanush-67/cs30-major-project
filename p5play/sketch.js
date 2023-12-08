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
  spaceshipMovement();
  
}

//Spaceship stuff
function createSpaceship(x,y,w,h){
  Spaceship = new Sprite(x, y, w, h);
  Spaceship.addImage("SHIP.png");
  //Spaceship.rotation = 90
}

function spaceshipMovement(){
  if (kb.presses('up')) { //thrust
  Spaceship.applyForce(0.1, Spaceship.rotation);
}

if (kb.presses('left')) { //turn left
  Spaceship.rotation -= 2.5;
}

if (kb.presses('right')) { //turn right
  Spaceship.rotation += 2.5;
}
}




// let player, gems;

// function setup() {
// 	new Canvas(160, 456);

// 	gems = new Group();
// 	gems.diameter = 10;
// 	gems.x = () => random(0, canvas.w);
// 	gems.y = () => random(0, canvas.h);
// 	gems.amount = 80;

// 	player = new Sprite();

// 	player.overlaps(gems, collect);
// }

// function collect(player, gem) {
// 	gem.remove();
// }

// function draw() {
// 	clear();
// 	player.moveTowards(mouse);
// }