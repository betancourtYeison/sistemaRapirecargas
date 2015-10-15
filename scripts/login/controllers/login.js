'use strict';

/**
 * @ngdoc function
 * @name facturacionLoginApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the facturacionLoginApp
 */

//Controlador para Login la cual tiene 1 servicio loginService con su respectivo scope
angular.module('facturacionLoginApp')
  .controller('LoginCtrl', ['$scope', 'loginService', 'firebaseRef', function ($scope,loginService, firebaseRef) {
  	
	var authData = firebaseRef().getAuth();
 	if(authData){
 		$scope.user = authData.password.email;
    	loginService.setUser(true,authData.password.email);  	
 	} 	
        	
	//Funcion para login por acceso normal
	$scope.loginPass=function(email,pass){
		loginService.loginPass(firebaseRef(),email,pass);//Autentica por acceso normal mediante la funcion que esta en la clase loginService		
	};

	//Funcion para crear un nuevo usuario
	$scope.newUser=function(email,pass){		
		loginService.newUser(firebaseRef(),email,pass);//Crea usuario mediante la funcion que esta en la clase loginService
	};
}]);