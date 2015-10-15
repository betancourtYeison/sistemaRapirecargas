'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio loginService con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('LoginCtrl', ['$scope', 'loginService', 'firebaseRef', function ($scope,loginService, firebaseRef) {
    
    var authData = firebaseRef().getAuth();
    $scope.user = authData.password.email;
    loginService.setUser(true,authData.password.email);  	    

    //Funcion para cerrar la sesion
    $scope.logout=function(){
    	loginService.logout(firebaseRef(),$scope);//Cierra la sesion mediante la funcion que esta en la clase loginService
      	loginService.setUser(false);//Determina que no hay usuario mediante la funcion que esta en la clase loginService
    };
    
}]);