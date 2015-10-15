'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:ClientesCtrlU
 * @description
 * # ClientesCtrlU
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio clientesServiceU con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('ClientesCtrlU', ['$scope', 'clientesServiceU', '$location', '$firebaseArray', 'firebaseRef', '$routeParams', 'syncData', function ($scope, clientesServiceU, $location, $firebaseArray, firebaseRef, $routeParams, syncData) {
        
    var ref = new Firebase("https://sistema-rapirecargas.firebaseio.com/clientes");

    $scope.refclientes = $firebaseArray(ref);

    $scope.refclientes.$loaded().then(function(refclientes) {
        $scope.clientes = $scope.refclientes.$getRecord($routeParams.rut);                
    });         

    $scope.updateCustomer = function () {//Funcion que llama al servicio para editar    	
      clientesServiceU.updateCustomer($scope, $location);
    }

    $scope.cancel = function () {//Funcion que llama al servicio para cancelar la actualizacion
      clientesServiceU.cancel($location);      
    };
    
}]);