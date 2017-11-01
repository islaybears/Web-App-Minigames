
app = angular.module('inventory', ['ngRoute']);

//call page styles
require("./partials/headerStyle.css");
require("./pages/home/homeStyle.css");
require("./pages/bulletHell/bulletHellStyle.css");
require("./pages/connect4/connect4Style.css");

//call angularjs controllers, services
require("./pages/home/homeCtrl.js");
require("./pages/bulletHell/bulletHellCtrl.js");
require("./pages/connect4/connect4Ctrl.js");
require("./pages/bulletHell/bulletHellServices.js");

app.config(function($locationProvider, $routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'app/pages/home/homeView.html',
      controller: 'homeCtrl'
    })
    .when('/bullet-hell', {
      templateUrl: 'app/pages/bulletHell/bulletHellView.html',
      controller: 'bulletHellCtrl'
    })
    .when('/connect-4', {
      templateUrl: 'app/pages/connect4/connect4View.html',
      controller: 'connect4Ctrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});