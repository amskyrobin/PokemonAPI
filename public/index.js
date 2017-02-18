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

var getPokemon = function(){

  if(this.status != 200) return;
  var jsonString = this.responseText;
  var allPokemon = JSON.parse(jsonString);

  var pokemonArray = allPokemon.results;
  var pokemonDetails = pokemon[this.value];
  var pokemonURL = pokemonDetails.url;
  getDetailsRequest(pokemonURL, requestComplete);
}


var requestComplete = function(){
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var pokemonDetails = JSON.parse(jsonString);
  console.log(pokemonDetails);

}

var populateList = function(){
  var ul = document.getElementById('pokemon');
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var allPokemon = JSON.parse(jsonString);

  pokemonArray = allPokemon.results;
  console.log(pokemonArray)

  pokemonArray.forEach(function(element){
    var button = document.createElement('input');
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
    appendElements(button, ul);
  });

}

var getPokemonURL = function(pokemonName){
  //var pokemonName = button.value;
  var pokemonURL = "http://pokeapi.co/api/v2/pokemon/" + pokemonName + "/";

  makeRequest(pokemonURL, displayDetails);
  console.log(pokemonURL);


}


var displayDetails = function(){
  var detailsContainer = document.querySelector('#pokemon-details');

  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var pokemon = JSON.parse(jsonString)[0];


  var detailOne = document.getElementById("firstDetail");
  if (detailOne === null) {
    detailOne = document.createElement('h2');
    detailOne.id = "firstDetail";
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

  detailOne.innerText = "Detail One: " + pokemon;
  detailTwo.innerText = "PDetail Two: " + pokemon;
  detailThree.innerText = "Detail Three: " + pokemon;

  
  
};


var app = function(){

  var button = document.getElementsByTagName('button');
  var url = "http://pokeapi.co/api/v2/pokemon/?limit=150"
  
  makeRequest(url, populateList);

  // button.onclick = getPokemonURL;
  console.log(button);

}


window.onload = app;