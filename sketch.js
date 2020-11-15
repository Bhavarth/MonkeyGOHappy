
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY=1
var END=0
var gameState=PLAY
var ground;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(500,400); 

  monkey =  createSprite(50,350,30,30);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale= 0.1;
  
  FoodGroup= new Group();
  obstacleGroup=new Group();
  
  ground= createSprite(250,390,1000,20);
  ground.shapeColor= "green";
  ground.velocityX=-4;
  
 monkey.setCollider("circle",0,0,260)
  monkey.debug=true;
  
  //obstacleGroup.debug=true;
}


function draw() {
background("lightblue");
  stroke("black")
  fill("black")
  text("Survival Time:" + score,350,50)
  score = Math.ceil(frameCount/frameRate());
if (gameState === PLAY){
  if (ground.x<0){
    
    ground.x=ground.width/2;
  }
  if (keyDown("space")&& monkey.y>= 300){
    monkey.velocityY=-12;
  }
  
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score++
  }
  
  if (obstacleGroup.isTouching(monkey)){
    gameState=END
  }
  
  
  monkey.velocityY= monkey.velocityY + 0.8;
  
  spawnobstacle();
  spawnfruit();
}
  
  else if (gameState===END){
    
    FoodGroup.destroyEach();
   FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
     ground.velocityX=0;
    monkey.velocityX=0;
    score=0;
    obstacleGroup.setLifetimeEach(-1)
     
    
  }
  monkey.collide(ground);
 drawSprites(); 
  
}

function spawnobstacle(){
  
 if(frameCount%180===0){
   obstacle= createSprite(500,365,10,10);
  obstacle.addImage(obstacleImage);
   obstacle.scale=0.1;
   obstacle.velocityX=-4;
   obstacle.lifetime=300;
   obstacleGroup.add(obstacle);
 } 
  
  
}

function spawnfruit(){
  
  if (frameCount%100===0){
   banana =createSprite(500,340,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=300;
    FoodGroup.add(banana)
    banana.y=Math.round(random(250,320))
  }
  
  
}


