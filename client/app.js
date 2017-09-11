angular
  .module('basketballTrainingApp', ['sessionCtrl', 'sessionService']);

angular.module('sessionService', [])
  .factory("Sessions", function($http) {
    return {
      get: function() {
        return $http.get('/');
      },
      create: function() {
        return $http.post('/', sessionData);
      },
      delete: function(id) {
        return $http.delete('/' + id);
      }
    }
  });
  
angular.module('sessionCtrl', [])
  .controller("mainCtrl", function($scope, $http) {
    $scope.formData = {};
    
    $http.get('/')
      .then(data => {
        console.log(data);
        $scope.userSessions = data;
      },(data, status) => {
        console.log(data, status);
      })
    

    $scope.addUserSession = () => {
      $http.post('/', $scope.formData)
          .then((data) => {
            $scope.formData = {};
            $scope.formData = data;
          }, data => {
            console.error(error);
          });
      };

      $scope.removeSession = function(id) {
        $http.delete('/' + id)
          .then(data => {
            $scope.userSessions = data;
          }, data => {
            console.error(data)
          })
      }; 
    });
  
  angular.module('youTubeCtrl', ['youtube-embed'])
    .controller('main', function($scope) {
      $scope.theBestVideo = "sMKoNBRZM1M";
    })
        // let oldSessions = $scope.userSessions;
        // $scope.userSessions = [];
        // angular.forEach(oldSessions, session => {
        //   console.log(session);
        //   if (!session.success) $scope.userSessions.push(session);
        // });
      

        // $scope.userSessions.push({
      //     type: $scope.drillType,
      //     name: $scope.drillName,
      //     duration: $scope.drillDuration,
      //     success: false
      //   });
      //   $scope.drillType = "";
      //   $scope.drillName = "";
      //   $scope.drillDuration = "";
      // };
  
  
  // .config(["$routeProvider", function($routeProvider) {
  //     $routeProvider
  //       .when("/", {
  //         templateUrl: "/addsessions.html",
  //         controller: "addSessionCtrl"
  //       })
  //       .when("/drills", {
  //         templateUrl: "/drills.html",
  //         controller: "drillsListCtrl"
  //       });
  //   }]);
  