var dog, dogImg, happyDog;
var database;
var foodStock;
var foodS;

function preload() {
  dogImg = loadImage('images/Dog.png');
  happyDog = loadImage('images/happydog.png');
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(300, 350, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.25

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock)
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.addImage(happyDog);
  }

  drawSprites();
  textSize(15);
  fill("white");
  text(foodS, 20, 50);
}

function writeStock(x) {
  if (x <= 0) {
    x = 0
  }
  else {
    x = x-1
  }
  database.ref('/').update({
    Food: x
  })
}
function readStock(){
  var foodStockRef = database.ref('Food');
  foodStockRef.on("value",(data)=>{
    foodS = data.val();
  })
}
