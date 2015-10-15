'use strict';

// Declare app level module which depends on filters, and services
angular.module('facturacionAdminApp.config', [])

   // version of this seed app is compatible with angularFire 0.6
   // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
   .constant('version', '0.6')

   // your Firebase URL goes here
   //.constant('FBURL', 'https://INSTANCE.firebaseio.com');
   .constant('FBURL', 'https://sistema-rapirecargas.firebaseio.com/');
