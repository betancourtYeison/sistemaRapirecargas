'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:ReportesVentasProductoCtrl
 * @description
 * # ReportesVentasProductoCtrl
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio reportesVentasProductoServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('ReportesVentasProductoCtrl', ['$scope', 'ngTableParams', 'reportesVentasProductoServiceCRD', '$timeout', '$location', '$firebaseArray', 'firebaseRef', '$filter', '$routeParams', 
    function ($scope, ngTableParams, reportesVentasProductoServiceCRD, $timeout, $location, $firebaseArray, firebaseRef, $filter, $routeParams) {      
  
    var ref = new Firebase("https://sistema-rapirecargas.firebaseio.com/registroVentas/"+$routeParams.noFactura+"/datosProducto");   

    $scope.refproductsList = $firebaseArray(ref);
    $scope.noFactura = $routeParams.noFactura;
    
    $scope.refproductsList.$loaded().then(function(refproductsList) {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: { id: 'asc' } 
        }, {
            total: refproductsList.length, // length of data
            getData: function ($defer, params) {          
                var orderedData = params.sorting() ? $filter('orderBy')($scope.refproductsList, params.orderBy()) : data;                                 
                var pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());                
                $defer.resolve(pageData);
            }
        }) 
    }); 

    $scope.regresarReportes = function(){
      reportesVentasProductoServiceCRD.regresarReportes($location); 
    };

    $scope.ordenarPor = function(orden,sort){
      reportesVentasProductoServiceCRD.ordenarPor($scope, orden, sort);            
    };

}]);