'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:LlamadasInterCtrlU
 * @description
 * # LlamadasInterCtrlU
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio llamadasInterServiceU con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('LlamadasInterCtrlU', ['$scope', 'llamadasInterServiceU', '$location', '$firebaseArray', 'firebaseRef', '$routeParams', 'syncData', 
    function ($scope, llamadasInterServiceU, $location, $firebaseArray, firebaseRef, $routeParams, syncData) {
        
    var ref = new Firebase("https://sistema-rapirecargas.firebaseio.com/listadoProductos");

    $scope.refproductsList = $firebaseArray(ref);

    $scope.refproductsList.$loaded().then(function(refproductsList) {
        $scope.productsList = $scope.refproductsList.$getRecord($routeParams.codigoBarras);                        
    });         

    $scope.updateProduct = function () {//Funcion que llama al servicio para editar    	
      llamadasInterServiceU.updateProduct($scope, $location);
    }

    $scope.cancel = function () {//Funcion que llama al servicio para cancelar la actualizacion
      llamadasInterServiceU.cancel($location);      
    };
    
}]);