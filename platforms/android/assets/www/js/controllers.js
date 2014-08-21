angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends, srService) {
  $scope.friends = srService.getAllSRTypes();//Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
