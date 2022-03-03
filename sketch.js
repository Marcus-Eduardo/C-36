//crie uma base de dados com o horário da última refeição e a quantidade de comida disponível ('Food')
//adicione as configurações do banco de dados ao index.html
var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;

//criar variáveis da última refeição e do botão de alimentar
var HorarioRefeicao, botaoAlimentar;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  console.log(database)
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock,error);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //crie um botão de alimente o cachorro aqui. Chame a função feedDog(alimente o cachorro) quando o botão for pressionado
  botaoAlimentar = createButton("Alimentar")
  botaoAlimentar.position(700, 95);
  botaoAlimentar.mousePressed(feedDog);

  addFood = createButton("Adicionar comida ao estoque");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //atualize o horário da última refeição aqui
  database.ref("HorarioRefeicao").on("value", function (dados) {
    HorarioRefeicao = dados.val()
  })

  //escreva valor de comida no estoque
  fill("white")
  text("Estoque:"+foodS,660,60);

  //escreva o valor da hora da última refeição
  if(HorarioRefeicao !== undefined){
    text("Ultima Refeição: "+HorarioRefeicao+" Horas",700,300)
  }

  drawSprites();
}

//função de ler o estoque de comida
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//função de alimentar o cachorro
function feedDog() {
  dog.addImage(happyDog);

  //diminuia a quantidade de comida no estoque e atualizar a hora da última refeição
  foodS--
  // use a função hora() para obter a hora atual do seu computador
  HorarioRefeicao = hour();

  database.ref("/").update({
    Food: foodS,
    HorarioRefeicao: HorarioRefeicao
  });
}

//aumentando o número de comida do estoque
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  });
}
function error(){
  console.error("erro na leitura")
}
