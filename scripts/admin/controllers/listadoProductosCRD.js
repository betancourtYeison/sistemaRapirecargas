'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:ListadoProductosCtrlCRD
 * @description
 * # ListadoProductosCtrlCRD
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio listadoProductosServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('ListadoProductosCtrlCRD', ['$scope', 'ngTableParams', 'listadoProductosServiceCRD', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, listadoProductosServiceCRD, $location, $firebaseArray, firebaseRef, $filter) {    
  
    var ref = new Firebase("https://sistema-rapirecargas.firebaseio.com/listadoProductos");
    var toggle = true;      

    $scope.refproductsList = $firebaseArray(ref);
    $scope.master = {};
    $scope.sort = true;
    $scope.productExists = false;
    $scope.productoCreado = false;
    $scope.productsList = {
        id: ''
    }
      
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
    
    $scope.loadProductDescrip = function(){  
      var tam = $scope.refproductsList.length;  
      var arrayproductsList = {};
            
      if(toggle){
        $('.dropdown-menu-productDescrip').click().toggle();
        toggle = false;
      }              

      var tempDescripProductsList;
      var tempProductDescrip = $scope.productDescrip.toUpperCase();      


      if($scope.productDescrip != undefined){                 
        for (var i=0; i<tam; i++) {
          tempDescripProductsList = $scope.refproductsList[i].descripcion.substring(0,$scope.productDescrip.length).toUpperCase();          
          if(tempProductDescrip == tempDescripProductsList){                        
            arrayproductsList[$scope.refproductsList[i].codigoBarras] = {referencia: $scope.refproductsList[i].referencia, 
                                                              descripcion: $scope.refproductsList[i].descripcion, 
                                                              codigoBarras: $scope.refproductsList[i].codigoBarras,
                                                              precioUnitario: $scope.refproductsList[i].precioUnitario};            
          }
        };
      }else{
        $('.dropdown-menu-productDescrip').click().toggle();
        toggle = true;
      }      

      if(jQuery.isEmptyObject(arrayproductsList)){
        arrayproductsList[0] = {descripcion : 'No existe'};
        $scope.productsList = arrayproductsList; 
        $scope.productExists = false;
      }else{
        $scope.productExists = true;
        $scope.productsList = arrayproductsList;            
      }      
    }  

    $scope.loadProductCodigo = function(){  
      var tam = $scope.refproductsList.length;  
      var arrayproductsList = {};
            
      if(toggle){
        $('.dropdown-menu-productCod').click().toggle();
        toggle = false;
      }  

      if($scope.productCod != undefined){                 
        for (var i=0; i<tam; i++) {
          if($scope.productCod == $scope.refproductsList[i].codigoBarras.substring(0,$scope.productCod.length)){            
            arrayproductsList[$scope.refproductsList[i].codigoBarras] = {referencia: $scope.refproductsList[i].referencia, 
                                                              descripcion: $scope.refproductsList[i].descripcion, 
                                                              codigoBarras: $scope.refproductsList[i].codigoBarras,
                                                              precioUnitario: $scope.refproductsList[i].precioUnitario};            
          }
        };
      }else{
        $('.dropdown-menu-productCod').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arrayproductsList)){
        arrayproductsList[0] = {codigoBarras : 'No existe'};
        $scope.productsList = arrayproductsList; 
        $scope.productExists = false;
      }else{
        $scope.productsList = arrayproductsList;            
        $scope.productExists = true;
      }
    }

    $scope.loadProductValue = function(){  
      var tam = $scope.refproductsList.length;  
      var arrayproductsList = {};
            
      if(toggle){
        $('.dropdown-menu-productVal').click().toggle();
        toggle = false;
      }      

      if($scope.productVal != undefined){                 
        for (var i=0; i<tam; i++) {
          if($scope.productVal == $scope.refproductsList[i].precioUnitario.substring(0,$scope.productVal.length)){            
            arrayproductsList[$scope.refproductsList[i].codigoBarras] = {referencia: $scope.refproductsList[i].referencia, 
                                                              descripcion: $scope.refproductsList[i].descripcion, 
                                                              codigoBarras: $scope.refproductsList[i].codigoBarras,
                                                              precioUnitario: $scope.refproductsList[i].precioUnitario};            
          }
        };
      }else{
        $('.dropdown-menu-productVal').click().toggle();
        toggle = true;
      }   

      if(jQuery.isEmptyObject(arrayproductsList)){
        arrayproductsList[0] = {precioUnitario : 'No existe'};        
        $scope.productsList = arrayproductsList; 
        $scope.productExists = false;
      }else{
        $scope.productsList = arrayproductsList;            
        $scope.productExists = true;
      }
    }
   
    $scope.changeProduct = function(idClass, referencia, descripcion, codigoBarras, precioUnitario){//Cuando eliges un Product lo reemplaza en el campo de texto      
      if(descripcion != 'No existe' && codigoBarras != 'No existe' && precioUnitario != 'No existe'){
        if(idClass == 'descripcion'){
          $('.dropdown-menu-productDescrip').click().toggle();
        }else if(idClass == 'codigoBarras'){
          $('.dropdown-menu-productCod').click().toggle();
        }else if(idClass == 'precioUnitario'){
          $('.dropdown-menu-productVal').click().toggle();
        }        
        toggle = true;                
        $scope.productRef = referencia;
        $scope.productDescrip = descripcion;
        $scope.productCod = codigoBarras;
        $scope.productVal = precioUnitario;
        $scope.productsList = null;
      }      
    }   
    
    $scope.exitsProduct = function () {//funcion que llama al servicio para crear usuario          
      $scope.Product = $scope.refproductsList.$getRecord($scope.productsList.codigoBarras);          
      if($scope.Product != null){        
        return true;
      }else{        
        return false;
      }
    }
    
    $scope.createNewProduct = function (form) {//funcion que llama al servicio para crear usuario  
      listadoProductosServiceCRD.createNewProduct(firebaseRef, $scope, form);
      $scope.productoCreado = true;              
    }

    $scope.editProduct = function (id) {//funcion que llama al servicio para editar usuario
      listadoProductosServiceCRD.editProduct($location, id);      
    };

    $scope.deleteProduct = function(id) {//funcion que llama al servicio para eliminar usuario        
      listadoProductosServiceCRD.deleteProduct($scope, id);                
    }

    $scope.ordenarPor = function(orden,sort){
      listadoProductosServiceCRD.ordenarPor($scope, orden, sort);            
    };

    $scope.closeAlert = function () {//funcion que llama al servicio para crear usuario    
      $scope.productoCreado = false; 
    }
}]);