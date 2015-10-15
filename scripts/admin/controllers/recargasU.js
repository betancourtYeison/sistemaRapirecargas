'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:RecargasCtrlU
 * @description
 * # RecargasCtrlU
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio recargasServiceU con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('RecargasCtrlU', ['$scope', 'recargasServiceU', '$location', '$firebaseArray', 'firebaseRef', '$routeParams', 'syncData', 
    function ($scope, recargasServiceU, $location, $firebaseArray, firebaseRef, $routeParams, syncData) {
        
    var ref = new Firebase("https://sistema-rapirecargas.firebaseio.com/listadoProductos");

    $scope.refproductsList = $firebaseArray(ref);

    $scope.refproductsList.$loaded().then(function(refproductsList) {
        $scope.productsList = $scope.refproductsList.$getRecord($routeParams.codigoBarras);                        
    });         

    $scope.updateProduct = function () {//Funcion que llama al servicio para editar    	
      recargasServiceU.updateProduct($scope, $location);
    }

    $scope.cancel = function () {//Funcion que llama al servicio para cancelar la actualizacion
      recargasServiceU.cancel($location);      
    };
    
}]);