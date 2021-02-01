var path,pathImg,car,carImg,compcar,compcarImg1,compcarImg2,compcarImg3,carhorn;
var gameState="play";
var invisibleGround,invisibleGround2;

function preload(){
  pathImg=loadImage("path.png");
  carImg=loadImage("car.png");
  compcarImg1=loadImage("compcar-1.png");
  compcarImg2=loadImage("opp.png");
  compcarImg3=loadImage("compcar2.png");
  //car horn
  carhorn=loadSound("carhorn.mp3");
}

function setup(){
  createCanvas(340,800);
  
  path = createSprite(170,400,30,30);
  path.addImage("path",pathImg);
  path.velocityY=6;
  
  car = createSprite(75,700,30,30);
  car.addImage("car",carImg);
  car.scale=0.3;
  
  compCarGroup = new Group();
  
  invisibleGround=createSprite(17,400,5,800);
  invisibleGround.visible=false;
  
  invisibleGround2=createSprite(323,400,5,800);
  invisibleGround2.visible=false;
  
}
function draw(){
  background("black");
  if(path.y>500){
    path.y=400;
  }
  
  if(gameState ==="play"){
    car.collide(invisibleGround);
    car.collide(invisibleGround2);
    if(keyDown("right")){
    car.x=car.x+2;
  }
  if(keyDown("left")){
    car.x=car.x-2;
  }
    
  if(keyDown("space")){
    carhorn.play();
  }  
    
  spawnCompCar();
    
   if(compCarGroup.isTouching(car)){
    gameState="end";
  } 
   
  drawSprites();
  }
  if(gameState==="end"){
    background("black");
    stroke("yellow");
    fill("red");
    text("Game Over",95,400,textSize(30));
    }   
  
   
}

function spawnCompCar(){
  if(frameCount%150===0){
    compcar= createSprite(Math.round(random(60,280)),50,20,20);
    compcar.velocityY=4;
     var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: compcar.addImage("compcar1",compcarImg1);
              break;
      case 2: compcar.addImage("compcar2",compcarImg2);
              break;
      case 3: compcar.addImage("compcar3",compcarImg3);
              break;        
      default: break;
    }
    compcar.scale=0.42;
    compcar.lifetime=300;
    car.depth=compcar.depth;
    car.depth+=1;
    compCarGroup.add( compcar);
    }
}