// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let spaceship;
let bgImg;
let spaceshipImg;
let asteroidImg;
let asteroidArray;


function preload() {
  bgImg = loadImage("Assets/Images/space bg.png");
  spaceshipImg = loadImage("Assets/Images/Spaceship3.png")
  //spaceshipImg = loadImage("Assets/Images/turned spaceship.png");
  asteroidImg = loadImage("Assets/Images/Asteroid image.png");
}

function setup(){
  new Canvas();
  createSpaceship(width/2,height/2,50,50);
  
  // for (let i = 0; i < 10; i++) {
  //   asteroidArray.push(createAsteroid());
  // }

}

function draw() {
  clear();
  background(bgImg);
  spaceshipControls();
  //spaceship.updateMovement();
  edges();
}

//Spaceship stuff
function createSpaceship(x,y,w,h){
  spaceship = new Sprite(x, y, w, h);
  push();
  spaceship.scale = 0.5;
  imageMode(CENTER);
  spaceship.addImage(spaceshipImg);
  pop();

}


//   spaceship.updateMovement = function() {
//     if (kb.pressing('up')){
//       spaceship.direction = spaceship.rotation - 90;
      

//       if(spaceship.speed < 10)
//       spaceship.speed += 0.2;
//       console.log(spaceship.vel.y);
//     } 
//     else{
//       if (spaceship.speed > 0) {
//         spaceship.speed *= 0.95;
//       }
//     } 
//     if (kb.pressing('right')) spaceship.rotation += 5;
//     if (kb.pressing('left')) spaceship.rotation -= 5;
//   };
// }


// when we press "w" speed gets added to the spacship until its speed reaches 10 after which no more 
// speed is added to the spaceship.Whatever speed it has gained it will have that speed. When "w" is
// released then we multiply speed by a decimal number which acts as friction.
function spaceshipControls(){
  if (kb.pressing("up")){
    //spaceship.heading = spaceship.rotation-90;
    spaceship.bearing = spaceship.rotation;
    spaceship.applyForce(10)
    // if(spaceship.speed < 10){
    //   spaceship.speed += 0.1;
    //   console.log(spaceship.speed)
    // }
  } 


  // else{
  //   if (spaceship.speed > 0) {
  //     spaceship.speed *= 0.985;
  //   }
  // } 

  if (kb.pressing("right")){

    spaceship.rotation += 5;
    //spaceship.speed *= 0.99;
  }
  if (kb.pressing("left")){
    spaceship.rotation -= 5;
    //spaceship.speed *= 0.99;
  } 
}


function edges(){
  if (spaceship.x > width + spaceship.w){
    spaceship.x = -10;
  }
  else if (spaceship.x < -spaceship.w){
    spaceship.x = width + spaceship.w;
  }
  if (spaceship.y > height + spaceship.h){
    spaceship.y = -10;
  }
  else if (spaceship.y < -spaceship.h){
    spaceship.y = height + spaceship.h;
  }
}


