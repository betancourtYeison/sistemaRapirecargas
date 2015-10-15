'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:TarjetasSIMCtrlU
 * @description
 * # TarjetasSIMCtrlU
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio tarjetasSIMCServiceU con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('TarjetasSIMCtrlU', ['$scope', 'tarjetasSIMCServiceU', '$location', '$firebaseArray', 'firebaseRef', '$routeParams', 'syncData', 
    function ($scope, tarjetasSIMCServiceU, $location, $firebaseArray, firebaseRef, $routeParams, syncData) {
        
    var ref = new Firebase("https://sistema-rapirecargas.firebaseio.com/listadoProductos");

    $scope.refproductsList = $firebaseArray(ref);

    $scope.refproductsList.$loaded().then(function(refproductsList) {
        $scope.productsList = $scope.refproductsList.$getRecord($routeParams.codigoBarras);                        
    });         

    $scope.updateProduct = function () {//Funcion que llama al servicio para editar    	
      tarjetasSIMCServiceU.updateProduct($scope, $location);
    }

    $scope.cancel = function () {//Funcion que llama al servicio para cancelar la actualizacion
      tarjetasSIMCServiceU.cancel($location);      
    };
    
}]);