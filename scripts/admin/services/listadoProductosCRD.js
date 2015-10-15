'use strict';

/**
 * @ngdoc service
 * @name facturacionAdminApp.Cliente
 * @description
 * # Cliente
 * Service in the facturacionAdminApp.
 */

//Servicio de Ventas
angular.module('facturacionAdminApp')
  .factory('listadoProductosServiceCRD',function(){	
	return{				
		createNewProduct:function(firebaseRef, scope, form){//Funcion para crear usuario
			var onComplete = function(error) {
			  if (!error) {
			    scope.tableParams.reload();
			    if (form) {
			      form.$setPristine();        
			    }
			    scope.productsList = angular.copy(scope.master);
			  } 
			};		
			
			firebaseRef('listadoProductos/'+ scope.productsList.codigoBarras).set({
			  codigoBarras: scope.productsList.codigoBarras,			  
			  referencia: scope.productsList.referencia,			  
			  descripcion: scope.productsList.descripcion,
			  precioUnitario: scope.productsList.precioUnitario,
			  grupo: scope.productsList.grupo,
			  unidad: scope.productsList.unidad,
			  cantidad: scope.productsList.cantidad
			}, onComplete);  
		},
		editProduct:function(location, codigoBarras){//Funcion para editar usuario
			location.path('/listaProductosU/' + codigoBarras);
		},
		deleteProduct:function(scope, codigoBarras){//Funcion para eliminar usuario
			scope.refproductsList.$remove(scope.refproductsList.$getRecord(codigoBarras)).then(function(){
			  //data has been removed to our database  			  
			  scope.tableParams.reload();
  			});     
		},
		ordenarPor:function(scope, orden, sort){//Funcion para eliminar usuario
			scope.sort = sort;
      		scope.ordenSeleccionado = orden;
		}
	};
});