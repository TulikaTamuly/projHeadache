//Create variables here
var gameState=0
var dog
var foodS=20
var count,Time
var dateTime
var timeEngine
var milk=[]
function preload()
{
  //load images here
  DogImage=loadImage("dogImg.png")
  DogHappyImage=loadImage("dogImg1.png")
  gardenImage=loadImage("Garden.png")
  washRoomImage=loadImage("Wash Room.png")
  bedImage=loadImage("Bed Room.png")
  deadImage=loadImage("deadDog.png")
 }

function setup() {
  database=firebase.database()
  
	createCanvas(600, 700);
  dog=createSprite(300,600)
  dog.addImage(DogImage)
  dog.scale=0.2
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  gameStateRef=database.ref('gameState')
  gameStateRef.on("value",readState)

  timeCount=database.ref('Time')
  timeCount.on("value",readTime)

  button1=createButton("Feed Tommy")
  button1.position(300,60)
  button1.mousePressed(options)
  

  button2=createButton("Refill stock")
  button2.position(450,60)
  button2.mousePressed(fillStock)
  
  
  
  
  for(var i=1;i<21;i++){
    milk[i]=new milkBottle()
  }
  milkFeeding=new milkBottle()
}


function draw() {  
  //console.log(mouseX,mouseY)
  
  time()
 //if(keyWentDown(UP_ARROW)){
   
   
 //   writeStock(foodS)
    
 // }
 // if(keyWentDown(DOWN_ARROW)){
 //   writestock(foodS)
 // }
 
 
  if(gameState===0){
    background("yellowgreen")
    dog.x=300
    dog.y=600
    fill("darkgreen")
    textSize(19)
    
    text("Food:"+foodS,140,65)
    
if(frameCount-count>500){
  dog.addImage(DogImage)

}else if(frameCount-count<500){
  milkFeeding.display(175,600)
}


if(foodS>0){
  milk[1].display(50,250)}
  if(foodS>1){
  milk[2].display(75,250)}
  if(foodS>2){
  milk[3].display(100,250)}
  if(foodS>3){
  milk[4].display(125,250)}
  if(foodS>4){
  milk[5].display(150,250)}
  if(foodS>5){
  milk[6].display(175,250)}
  if(foodS>6){
  milk[7].display(200,250)}
  if(foodS>7){
  milk[8].display(225,250)}
  if(foodS>8){
  milk[9].display(250,250)}
  if(foodS>9){
  milk[10].display(275,250)}
  if(foodS>10){
  milk[11].display(300,250)}
  if(foodS>11){
  milk[12].display(325,250)}
  if(foodS>12){
  milk[13].display(350,250)}
  if(foodS>13){
  milk[14].display(375,250)}
  if(foodS>14){
  milk[15].display(425-25,250)}
  if(foodS>15){
  milk[16].display(450-25,250)}
  if(foodS>16){
  milk[17].display(475-25,250)}
  if(foodS>17){
  milk[18].display(500-25,250)}
  if(foodS>18){
  milk[19].display(525-25,250)}
  if(foodS>19){
  milk[20].display(550-25,250)}

  
  }
 
  if(Time>12){
    text("Last fed:"+Time+"PM",140,85) 
  }else{
  text("Last fed:"+Time+"AM",140,85)
}


if(timeEngine-Time===1){
 gameState=1
 writeState()
}
if(gameState===1){
   
   background(gardenImage)
   dog.x=-2000
   dog.y=-48787
   textSize(15)
   fill("white")
   if(Time>12){
    text("Last fed:"+Time+"PM",140,85) 
  }else{
  text("Last fed:"+Time+"AM",140,85)
}
}

console.log(Time,   timeEngine, gameState,  mouseX,mouseY)


if(timeEngine-Time===2){
  gameState=2
  writeState()
 }
 if(gameState===2){
   
    background(washRoomImage)
    dog.x=-2000
    dog.y=-48787
    textSize(15)
    fill("white")
    if(Time>12){
     text("Last fed:"+Time+"PM",140,85) 
   }else{
   text("Last fed:"+Time+"AM",140,85)
 }
 }

 if(timeEngine-Time===3){
  gameState=3
  writeState()
 }
 if(gameState===3){
    
    background(bedImage)
    dog.x=-2000
    dog.y=-48787
    textSize(15)
    fill("white")
    if(Time>12){
     text("Last fed:"+Time+"PM",140,85) 
   }else{
   text("Last fed:"+Time+"AM",140,85)
 }
 }


 if(timeEngine-Time>3||timeEngine-Time<0){
  gameState=5
  writeState()
 }
 if(gameState===5){
    button1.hide() 
    button2.hide()
    background("red")
    dog.addImage(deadImage)
    dog.x=300
    dog.y=600
    textSize(20)
    fill("black")
    text("ALAS! Tommy's no more",200,200)
 
 }
 
 //if(gameState!==0){

 //}
  drawSprites();
  //add styles here
  
}
function game(){
  
  gameState=0

}
function readStock(data){
  foodS=data.val()
 
}
function readState(data){
  gameState=data.val()
 
}
function showError(){
  console.log("error in writing the database")
}
function feedDog(){

  if(foodS<=0){
    foodS=0
  }else{
    foodS=foodS-1
  }
  count=frameCount
  dog.addImage(DogHappyImage)
  
  database.ref('/').update(
    {Food:foodS}
  )
}

function writeState(){
  database.ref('/').update(
    {gameState:gameState}
  )
}
function fillStock(){

  if(foodS<20){
    foodS=foodS+1
  }
  
  database.ref('/').update(
    {Food:foodS}
  )
}

async function time(){
    var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var responseJSON=await response.json()
    dateTime=responseJSON.datetime
    timeEngine=dateTime.slice(11,13)
  
    
    

}
function readTime(data){
Time=data.val()
}
function setTime(){
  
  Time=dateTime.slice(11,13)
  database.ref('/').update(
    {Time:Time}
  )
 

}

function options(){
  setTime()
  game()
  feedDog()
}


















