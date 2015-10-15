'use strict';

/**
 * @ngdoc function
 * @name facturacionAdminApp.controller:RegistroVentasCtrlCRD
 * @description
 * # RegistroVentasCtrlCRD
 * Controller of the facturacionAdminApp
 */

//Controlador para Login la cual tiene 1 servicio registroVentasServiceCRD con su respectivo scope
angular.module('facturacionAdminApp')
  .controller('RegistroVentasCtrlCRD', ['$scope', 'ngTableParams', 'registroVentasServiceCRD', '$timeout', '$location', '$firebaseArray', 'firebaseRef', '$filter', 
    function ($scope, ngTableParams, registroVentasServiceCRD, $timeout, $location, $firebaseArray, firebaseRef, $filter) {        

    $(window).on('beforeunload', function(e){    
      if(!jQuery.isEmptyObject($scope.datosProducto)){
        var e = e || window.event;
        
        if (e) {
            e.returnValue = '¿Está seguro que desea salir? No se han guardados los cambios y la información se puede perder.';
        }          

        return '¿Está seguro que desea salir? No se han guardados los cambios y la información se puede perder.';
      }          
    });    
    
    $(window).bind('hashchange', function(e) {
      /* things */
      console.log("Cambio url");
    });

    $(window).on('unload', function(){
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log($scope.refProductEdit);
        registroVentasServiceCRD.updateTempBase(firebaseRef, $scope.refProductEdit);               
    });
  
    var ref = new Firebase("https://sistema-rapirecargas.firebaseio.com/registroVentas");
    var refProduct = new Firebase("https://sistema-rapirecargas.firebaseio.com/listadoProductos");
    var refProductTemp = new Firebase("https://sistema-rapirecargas.firebaseio.com/listadoProductosTemporal");
    var f = new Date();    

    $scope.fecha = (f.getMonth() +1) + "/" + f.getDate() + "/" +  f.getFullYear();  
    $scope.hora = f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
    $scope.refVentas = $firebaseArray(ref);
    $scope.refProductEdit = $firebaseArray(refProduct);    
    $scope.refProductsTemp = $firebaseArray(refProductTemp);    
    $scope.master = {};
    $scope.factura = [];
    $scope.datosProducto = [];
    $scope.subTotal = 0;
    $scope.impuesto = 0;
    $scope.descuento = 0;
    $scope.total = 0;
    $scope.sort = true;  
    $scope.facturaRealizada = false;
    $scope.generarFactura = true;  
    $scope.productExists = true;  
    $scope.productIsntInTable = true;  
    $scope.productCountMax = true;  
    $scope.productCountMaxVlr = 0;

    $scope.refVentas.$loaded().then(function(refVentas) {
        $scope.noFactura = refVentas.length + 1;
    }); 

    $scope.refProductEdit.$loaded().then(function(refProductEdit) {
        //registroVentasServiceCRD.updateTempBase(firebaseRef, refProductEdit);      
    }); 

    var authData = firebaseRef().getAuth();
    if(authData){
      $scope.user = authData.password.email;          
    }          

    $scope.updateTempBase = function () {//funcion que llama al servicio para crear usuario                        
      registroVentasServiceCRD.updateTempBase(firebaseRef, $scope.refProductEdit);      
    }


    $scope.calculateValTot = function (producto) {//funcion que llama al servicio para crear usuario                        
      registroVentasServiceCRD.calculateValTot(producto, $scope);      
    }

    $scope.calculateTot = function () {//funcion que llama al servicio para crear usuario            
      registroVentasServiceCRD.calculateTot($scope);            
    }
    
    $scope.addProduct = function (productExists, customerName, customerId, customerPhone, productRef, productDescrip, productCod, productVal, productCount, productPago ) {//funcion que llama al servicio para crear usuario                                  

      $scope.productExists = productExists;  
      $scope.productIsntInTable = true;  
      $scope.productCountMax = true;  

      for (var i=0; i<$scope.datosProducto.length; i++) {                             
        if($scope.datosProducto[i].codigoBarras == productCod){            
          $scope.productEdit = $scope.refProductsTemp.$getRecord(productCod);          
          $scope.productEditCantidad = $scope.productEdit.cantidad;          
          $scope.productEdit.cantidad = ($scope.productEdit.cantidad - productCount);          

          if($scope.productEdit.cantidad<0){              
            $scope.productCountMax = false;  
            $scope.productCountMaxVlr = $scope.productEditCantidad;
            $scope.productEdit.cantidad = $scope.productEditCantidad;
          }                  

          if($scope.productCountMax){            
            $scope.datosProducto[i].cantidad = ($scope.datosProducto[i].cantidad + productCount);
            registroVentasServiceCRD.calculateValTot($scope.datosProducto[i], $scope);   
            registroVentasServiceCRD.updateCountProduct(firebaseRef, $scope);
          }            

          $scope.productIsntInTable = false;  
          break;
        }
      }      

      //Si no existe en la tabla recore los productos y revisa si la cantidad no excede el stock
      if($scope.productIsntInTable){            
        $scope.productEdit = $scope.refProductsTemp.$getRecord(productCod);            
        $scope.productEditCantidadInicial = $scope.productEdit.cantidad;            
        $scope.productEdit.cantidad = ($scope.productEdit.cantidad - productCount); 

        if($scope.productEdit.cantidad<0){              
          $scope.productCountMax = false;  
          $scope.productCountMaxVlr = $scope.productEditCantidadInicial;
          $scope.productEdit.cantidad = $scope.productEditCantidadInicial;
        }        

      }
                  
      if($scope.productExists && $scope.productCountMax && $scope.productIsntInTable){        
        registroVentasServiceCRD.addProduct(customerName, customerId, customerPhone, productRef, productDescrip, productCod, productVal, productCount, productPago, $scope);            
        registroVentasServiceCRD.updateCountProduct(firebaseRef, $scope);
      }
    }

    $scope.updateCountProduct = function (operacion) {//Funcion que llama al servicio para editar           
      registroVentasServiceCRD.updateCountProduct(firebaseRef, $scope);
    }

    $scope.deleteProduct = function(id, codigoBarras) {//funcion que llama al servicio para eliminar usuario                                    
      $scope.productEdit.$id = codigoBarras;            

      for (var i=0; i<$scope.datosProducto.length; i++) {
        if($scope.datosProducto[i].codigoBarras == codigoBarras){                    

          $scope.productEdit.cantidad = ($scope.refProductsTemp.$getRecord(codigoBarras).cantidad + $scope.datosProducto[i].cantidad);
          $scope.productEdit.codigoBarras = $scope.datosProducto[i].codigoBarras;
          $scope.productEdit.descripcion = $scope.datosProducto[i].descripcion;
          $scope.productEdit.grupo = $scope.refProductsTemp.$getRecord(codigoBarras).grupo;
          $scope.productEdit.precioUnitario = $scope.datosProducto[i].precioUnitario;
          $scope.productEdit.referencia = $scope.datosProducto[i].referencia;        
          $scope.productEdit.unidad = $scope.refProductsTemp.$getRecord(codigoBarras).unidad;          
                                                    
        }
      };            
            
      registroVentasServiceCRD.updateCountProduct(firebaseRef, $scope);               
      registroVentasServiceCRD.deleteProduct(id, $scope);       
    }
      
    $scope.createBil = function () {//funcion que llama al servicio para crear usuario                      
      registroVentasServiceCRD.createBil(firebaseRef, $scope, $timeout, $location);   
      registroVentasServiceCRD.printPDF($scope);         
      $scope.noFactura = $scope.factura.noFactura + 1;
      $scope.facturaRealizada = true;      
    }

    $scope.ordenarPor = function(orden,sort){
      registroVentasServiceCRD.ordenarPor($scope, orden, sort);            
    };

    $scope.closeAlert = function () {//funcion que llama al servicio para crear usuario    
      $scope.facturaRealizada = false; 
      $scope.productExists = true; 
      $scope.productCountMax = true;  
    }
}]);