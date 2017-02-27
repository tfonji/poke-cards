/**
 * 
 */

var pokeapp = angular.module("pokecards", ['ui.router']);

pokeapp.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	.state('display-card', {
		url: '/showcard',
		templateUrl: 'display-card.html',
		controller: 'displayController'
	});
	
//	$stateProvider
//	.state('poke-data', {
//		url: '/',
//		templateUrl: 'pokedata.html',
//		controller: 'userSelections',
//		deepStateRedirect: true
//	});
	
	var dataState = {
		name: 'poke-data',
		url: '/',
		templateUrl: 'pokedata.html',
		controller: 'userSelections',
		deepStateRedirect: true,
        sticky: true
	};
	
	//$stateProvider.state(displayState);
	$stateProvider.state(dataState);
	

	
	//default routing
	$urlRouterProvider.otherwise('/');
	
});