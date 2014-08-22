angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {
    })

    .controller('FriendsCtrl', function($scope, srService, $log) {
      $log.debug("controller getting created");

        //$scope.friends = Friends.all();
        srService.getAllSRTypes().then(function(srTypes){
            $scope.srTypes = srTypes;
        });
    })

    .controller('FriendDetailCtrl', function($scope, $stateParams, srService, srModel, sessionService) {

        

        srService.getSRTypeConfig($stateParams.srCode).then(function(srTypeConfig){
            
    	    angular.forEach(srTypeConfig.attributes, function (key, value) {
    		if(key.values)
    		    key.values = key.values.slice(1,-1).split(",");
    	    });

            $scope.srType = srTypeConfig;  
            $scope.newSR = sessionService.newSR;
            $scope.newSR.service_code = $stateParams.srCode;

            $scope.submit = function () {
    	        console.log($scope.newSR);
            };

        });
    })

    .controller('AccountCtrl', function($scope, $ionicLoading, $compile, $log, sessionService) {
        
      $log.debug("controller getting created");

      function initialize() {
        $log.debug("I am initializing");  
        var miami = new google.maps.LatLng(25.798427, -80.3957649);
        
        var mapOptions = {
          center: miami,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: miami,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;

        $scope.centerOnMe();  
      }

      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
            
          sessionService.newSR.lat = pos.coords.latitude;   
          sessionService.newSR.lon = pos.coords.longitude;
   
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click');
      };



      //google.maps.event.addDomListener(window, 'load', initialize);
      initialize();  
      



    });
