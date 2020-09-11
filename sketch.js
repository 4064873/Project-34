var dog, happyDog, database, foodS, foodStock;
var dogIMG;

function preload()
{
dogIMG = loadImage("Dog.png")
happyDogIMG = loadImage("happydog.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  dog=createSprite(250,250,10,10)
  dog.addImage(dogIMG)
  dog.scale=0.5

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87)

if(keyWentDown(UP_ARROW)) {
writeStock(foodS);
dog.addImage(happyDogIMG);
dog.scale=0.5
}

  drawSprites();
  //add styles here

  textSize(35)
  fill("white")
  text("Press Up Arrow To Feed Dogo",20,470)

  textSize(13)
  fill("white")
  text("foodStock: " + foodS,200,70)
}

function readStock(data) {
  foodS=data.val();
}
function writeStock(x) {
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
