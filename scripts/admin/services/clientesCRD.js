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
  .factory('clientesServiceCRD',function(){	
	return{			
		createNewCustomer:function(firebaseRef, scope, form){//Funcion para crear usuario
			var onComplete = function(error) {
			  if (!error) {
			    scope.tableParams.reload();
			    if (form) {
			      form.$setPristine();        
			    }
			    scope.customers = angular.copy(scope.master);
			  } 
			};		
			
			firebaseRef('clientes/'+ scope.customers.id).set({
			  id: scope.customers.id,			  
			  nombre: scope.customers.nombre,			  
			  correo: scope.customers.correo,
			  direccion: scope.customers.direccion,
			  telefono: scope.customers.telefono,
			  area: scope.customers.area
			}, onComplete); 
		},
		editCustomer:function(location, id){//Funcion para editar usuario
			location.path('/clientesU/' + id);
		},
		deleteCustomer:function(scope, id){//Funcion para eliminar usuario
			scope.refcustomers.$remove(scope.refcustomers.$getRecord(id)).then(function(){
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