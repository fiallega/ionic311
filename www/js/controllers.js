angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, srService) {
  //$scope.friends = Friends.all();
  srService.getAllSRTypes().then(function(srTypes){
      $scope.srTypes = srTypes;
  });
})

.controller('FriendDetailCtrl', function($scope, $stateParams, srService) {
    srService.getSRTypeConfig($stateParams.srCode).then(function(srTypeConfig){
    
    	angular.forEach(srTypeConfig.attributes, function (key, value) {
    		if(key.values)
    			key.values = key.values.slice(1,-1).split(",")
    	});

    $scope.srType = srTypeConfig;  

    $scope.newSR


    $scope.submit = function () {
    	console.log($scope.newSR);
    }

  });
})

.controller('AccountCtrl', function($scope) {
});
