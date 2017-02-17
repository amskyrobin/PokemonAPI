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



var getSprite = function(){

  if(this.status != 200) return;
  var jsonString = this.responseText;
  var allPokemon = JSON.parse(jsonString);
  console.log(jsonString);


  



}


  // var requestComplete = function(){
  //   if(this.status != 200) return;
  //   var jsonString = this.responseText;
  //   var allPokemon = JSON.parse(jsonString);
  //   // console.log(pokemon);
  //   populateList(allPokemon);

  // }

  var populateList = function(pokemon){
    var ul = document.getElementById('pokemon');

    if(this.status != 200) return;
    var jsonString = this.responseText;
    var allPokemon = JSON.parse(jsonString);
    console.log(allPokemon);


    var pokemon = allPokemon.results;

    pokemon.forEach(function(element){
      console.log(element);
      var li = document.createElement('li');
      li.innerText = element.name;
      appendElements(li, ul);
    });

  }





var app = function(){
  var url = "http://pokeapi.co/api/v2/pokemon/?limit=150"
  makeRequest(url, populateList);

}


window.onload = app;