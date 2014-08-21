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
    $scope.srType = srTypeConfig;  
  });
})

.controller('AccountCtrl', function($scope) {
});
