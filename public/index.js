var appendElements = function(){
  for(var i = 0; i < (arguments.length-1); i++){
    var child = arguments[i];
    var parent = arguments[i + 1];
    parent.appendChild(child)
  }
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}


var requestComplete = function(){
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var pokemonDetails = JSON.parse(jsonString);
  // console.log(pokemonDetails);

}

var populateList = function(){
  var div = document.getElementById('pokemon');
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var allPokemon = JSON.parse(jsonString);
  // console.log(allPokemon)
  pokemonArray = allPokemon.results;
  // console.log(pokemonArray)

  pokemonArray.forEach(function(element){
    var button = document.createElement('input');
    var divWrapper = document.createElement('divWrapper');
    button.type = 'button';
    //button.innerText = element.name;
    button.value = element.name;
    button.id = element.name;
    button.addEventListener("click", function(result) {
      var pokemonId = result.target.id;
      getPokemonURL(pokemonId);
    }, false);
    //button.onclick = function() {
    //  console.log("clicked a button LOL");
    //};
    appendElements(button, divWrapper);
    appendElements(divWrapper, div);
  });

}

var getPokemonURL = function(pokemonName){
  var pokemonURL = "http://pokeapi.co/api/v2/pokemon/" + pokemonName + "/";

  makeRequest(pokemonURL, displayDetails);
  console.log(pokemonURL);

}

var getSpriteURL = function(){
  var number = Math.floor(Math.random() * 150 + 1);
  console.log(number);
  var spriteURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + number + ".png";

  

  return spriteURL;

  // console.log(spriteURL);

}


var displayDetails = function(){
  var detailsContainer = document.querySelector('#pokemon-details');

  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var pokemon = JSON.parse(jsonString);


  var detailOne = document.getElementById("firstDetail");
  if (detailOne === null) {
    detailOne = document.createElement('img');
    detailOne.id = "firstDetail";
    detailOne.height = "300";
    detailOne.width = "300";
    appendElements(detailOne, detailsContainer);
  }

  var detailTwo = document.getElementById("secondDetail");
  if (detailTwo === null){
    detailTwo = document.createElement('p');
    detailTwo.id = "secondDetail";
    appendElements(detailTwo, detailsContainer);
  }

  var detailThree = document.getElementById("thirdDetail");
  if (detailThree === null){
    detailThree = document.createElement('p');
    detailThree.id = "thirdDetail";
    appendElements(detailThree, detailsContainer);
  }

  detailOne.src = "" + pokemon.sprites.front_default;
  detailTwo.innerText = "Weight: " + pokemon.weight;
  detailThree.innerText = "Detail Three: " + pokemon;

  

  
};





var app = function(){

  var button = document.getElementsByTagName('button');
  var url = "http://pokeapi.co/api/v2/pokemon/?limit=150"
  
  makeRequest(url, populateList);

  // button.onclick = getPokemonURL;



  //------------------------------CANVAS SHIZ -----------------------------------------//

  var canvas = document.querySelector('#main-canvas');
  var context = canvas.getContext('2d');
  var image = document.createElement('img');
  image.src = "" + getSpriteURL();

  var drawRandomPokemon = function(){
    context.drawImage(image, 0, 0, 200, 200);
  }
  
  image.onload = drawRandomPokemon;


//-----------------------------------BLACK AND WHITE ----------------------------------//


var shadowPokemon = function(context, canvas){

  var imageData = context.getImageData(0, 0, 600, 500);
  var px = imageData.data;
  var length = px.length;

  for (var i = 0; i < length; i += 4 ) {
    var red = px[i];
    var green = px[i +1];
    var blue = px[i +2];
    var alpha = px[i +3];

    var greyScale = red *.3 + green * .59 + blue * .11;

    px[i] = greyScale;
    px[i + 1] = greyScale;
    px[i + 2] = greyScale;
  }

  context.putImageData(imageData, 0, 0);

}

}






window.onload = app;