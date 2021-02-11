var ghost,tower,door,climber;
var ghostImage,towerImage,doorImage,climberImage;
var gameState="PLAY";




function preload(){
  ghostImage=loadImage("ghost-standing.png");
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  
  ghost=createSprite(100,100);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
  
}
function draw(){
  background("yellow");
  if(gameState==="PLAY"){
  
  if(tower.y > 400){
    tower.y=300;
  }
  
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0;
    }
  if(keyDown("space")){
    ghost.velocityY=-12;
  }
 ghost.velocityY+=0.5;
  
  if(keyDown("left")){
    ghost.x=ghost.x-4
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+4
  }
  if(ghost.isTouching(invisibleBlockGroup)){
    gameState="END";
  }
 spawnDoors();
  drawSprites();
    
  }
  if(gameState==="END"){
    textSize(35);
    text("Game Over",200,300);
  }
  
  
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.x = Math.round(random(120, 400));
    door.addImage(doorImage);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);

    var climber = createSprite(200, 10);
    climber.x = door.x;
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);


    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = false;
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1;




  }
}