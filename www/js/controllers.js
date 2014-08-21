angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends, srService) {
  //$scope.friends = Friends.all();
  srService.getAllSRTypes().then(function(srTypes){
      $scope.friends = srTypes;
  });
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
