/**
 *
 */

//var pokeapp = angular.module("pokecards", ['ui.router']);
pokeapp.service('mySharedService', function(){

	var sharedService = {};
	sharedService.pokeData = [];
	sharedService.cardData = [];

	sharedService.setPokeData = function(data){
		this.pokeData = data.data;
	};

	sharedService.getPokeData = function(){
		return this.pokeData;
	}

	sharedService.setCardData = function(data){
		this.cardData = data;
	}

	sharedService.getCardData = function(){
		return this.cardData;
	}
    return sharedService;

});

pokeapp.controller('dataController', function($rootScope,$document, $scope, $http, mySharedService) {
	$rootScope.submitButton = {
		    value  : true
		  };
	$rootScope.showCardButton = {
		    value  : true
		  };

	$scope.getPokeData = function(){


		var id = ($scope.pokeId).split(",");

		$http({
			  method:"GET",
			  url:"https://pokeapi.co/api/v2/pokemon/" + id[0] + "/"
			}).then(function(data){
				$rootScope.submitButton = {
						value  : false
					  };
				console.log(data.data);
				console.log($scope.check);
				mySharedService.setPokeData(data);
			}, function(data){
			  console.log("failure - no data.");
			});

	}
});


pokeapp.controller('userSelections', function($rootScope, $state, $scope, mySharedService){

	$scope.getCardData = function(){
		var dataObject = {};
		var data = mySharedService.getPokeData();
		dataObject.name = data.name;
		dataObject.id = data.id;
		if($scope.heightValue == 'YES'){
			dataObject.height = data.height;
		}else{
			dataObject.height = undefined;
		}

		if($scope.weightValue == 'YES'){
			dataObject.weight = data.weight;
		}else{
			dataObject.weight = undefined;
		}

		if($scope.movesValue == 'YES'){
			dataObject.moves = data.moves.length;
		}else{
			dataObject.moves = undefined;
		}

		if($scope.baseExpValue == 'YES'){
			dataObject.baseExperience = data.base_experience;
		}else{
			dataObject.baseExperience = undefined;
		}
		if($scope.typeValue == 'YES'){
			dataObject.types = data.types.length;
		}else{
			dataObject.types = undefined;
		}

		mySharedService.setCardData(dataObject);
		console.log(mySharedService.getCardData());
		console.log("gets here");

	}

	$scope.showCard = function(){

		$rootScope.showCardButton = {
			    value  : false
			  };

		var cardObject = mySharedService.getCardData();
		$scope.pokemonName = cardObject.name;
		$scope.imageSource = 'sprites/'+cardObject.id+'.png';

		if(cardObject.height != undefined){
			$scope.pokemonHeight = 'height: '+cardObject.height;
		}else{
			$scope.pokemonHeight = "";
		}
		if(cardObject.weight != undefined){
			$scope.pokemonWeight = 'weight: '+cardObject.weight;
		}else{
			$scope.pokemonWeight = "";
		}
		if(cardObject.moves != undefined){
			$scope.pokemonMoves = 'number of moves: '+cardObject.moves;
		}else{
			$scope.pokemonMoves = "";
		}
		if(cardObject.baseExperience != undefined){
			$scope.pokemonBaseExp = 'base experience: '+cardObject.baseExperience;
		}else{
			$scope.pokemonBaseExp = "";
		}
		if(cardObject.types != undefined){
			$scope.pokemonTypes = 'number of types: '+cardObject.types;
		}else{
			$scope.pokemonTypes = "";
		}
	}
	$scope.displayHome = function(){
		$state.go('poke-data');
	}
});

pokeapp.controller('displayController', function($scope, mySharedService, $state){

	var cardObject = mySharedService.getCardData();
	$scope.pokemonName = cardObject.name;
	$scope.imageSource = 'sprites/'+cardObject.id+'.png';

	if(cardObject.height != undefined){
		$scope.pokemonHeight = 'height: '+cardObject.height;
	}else{
		$scope.pokemonHeight = "";
	}
	if(cardObject.weight != undefined){
		$scope.pokemonWeight = 'weight: '+cardObject.weight;
	}else{
		$scope.pokemonWeight = "";
	}
	if(cardObject.moves != undefined){
		$scope.pokemonMoves = 'number of moves: '+cardObject.moves;
	}else{
		$scope.pokemonMoves = "";
	}
	if(cardObject.baseExperience != undefined){
		$scope.pokemonBaseExp = 'base experience: '+cardObject.baseExperience;
	}else{
		$scope.pokemonBaseExp = "";
	}
	if(cardObject.types != undefined){
		$scope.pokemonTypes = 'number of types: '+cardObject.types;
	}else{
		$scope.pokemonTypes = "";
	}

	$scope.displayCard = function(){
		$state.go('display-card');
	}
});
