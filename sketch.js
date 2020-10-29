
var monkey , monkey_running;

var banana ,bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;

var score = 0;
var survivalTime;

var ground1, ground2;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 300);
  
  ground1 = createSprite(300, 290, 600, 1);
  ground2 = createSprite(600, 290, 600, 1);
  
  monkey = createSprite(50, 250, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
    
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(180);
  
   ground1.velocityX = -4
   if (ground1.x < 300){
      ground1.x = ground1.width/2;
   }
  
   ground2.velocityX = -4
   if (ground2.x < 0){
      ground2.x = ground2.width/2;
   }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground1);
  
  
  if (gameState === PLAY){
    
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >=250) {
        monkey.velocityY = -14;
    }
    
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+1;
    }
  
    stroke("white");
    fill("white");
    text("Score:"+score, 530, 30);
  
    stroke("black");
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time:"+survivalTime, 100, 30);
    
    food();
    obstacles();
  }
  
  if (obstacleGroup.isTouching(monkey)){
    
    gameState = END;
    obstacleGroup.setLifetimeEach = -1;
    obstacleGroup.setVelocityXEach = -1;
    bananaGroup.destroyEach();    
    
  } else if (gameState === END){
    
    bananaGroup.setVelocityXEach = 0;
    obstacleGroup.setVelocityXEach = 0;
    
    bananaGroup.setLifetimeEach = -1;
    obstacleGroup.setLifetimeEach = -1;
    
    monkey.lifetime = 0;
  }
  
  //monkey.debug = true
  monkey.setCollider("circle", 0, 0, 250)
  
  //console.log(frameCount)
  drawSprites();
}

function food(){
  if (frameCount % 150 === 0){
    banana = createSprite(600, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -4;
    banana.lifetime = 150;
    banana.scale = 0.1
    
    bananaGroup.add(banana);
  }
}

function obstacles() {
  
  if (frameCount%300 === 0){
    var obstacle = createSprite(600, 260, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.lifetime = 150;
    obstacle.scale = 0.2125;
    
    obstacleGroup.add(obstacle);
    
    //obstacle.debug = true
    obstacle.setCollider("rectangle",0,0,475,500);    
  }
}



