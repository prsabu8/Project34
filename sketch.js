//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogHappy = loadImage("happydog.png");
  doggy = loadImage("Dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog=createSprite(width/2, 350, 10,10);
  dog.addImage(doggy);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("Value",readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  drawSprites();
  //add styles here
  textSize(10);
  fill("white");
  stroke("white");
  text("Food Remaining: "+foodStock,300,30);
}

//Function to read values from DB
function readStock(data) {
  foodS=data.val();
  dog.x = foodS.x;
  dog.y = foodS.y;
}

//Function to write values in DB
function writeStock(x) {
  
  if (x<=0) {
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}