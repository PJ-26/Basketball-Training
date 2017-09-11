angular
  .module('basketballTrainingApp', ['sessionCtrl', 'sessionService'])
 
angular.module('sessionService', [])
  .factory("Sessions", function($http) {
    return {
      get: function() {
        return $http.get('/sessions');
      },
      create: function() {
        return $http.post('/sessions', sessionData);
      },
      delete: function(id) {
        return $http.delete('/sessions/' + id);
      }
    }
  });
  
angular.module('sessionCtrl', ["ngYoutubeEmbed"])
  .controller("mainCtrl", function($scope, $http) {

    $scope.videoURL = "https://www.youtube.com/watch?v=bnjed9YVCRs";


    $http.get('/sessions')
      .then(data => {
        console.log(data.data);
        $scope.userSessions = data.data;
      },(data, status) => {
        console.log(data, status);
      })
    

    $scope.addUserSession = () => {
      $http.post('/sessions', $scope.formData)
          .then((data) => {
            $scope.formData = data.data;
            console.log($scope.formData);
            $http.get("/sessions").then(data => {
                $scope.userSessions = data.data;
              }, (data, status) => {
                console.log(data, status);
              });
          }, data => {
            if(error) console.error(error);
            else $scope.formData = {};
          });
      };

      $scope.removeSession = function(id) {
        $http.delete('/sessions/' + id)
          .then(data => {
            $scope.userSessions = data.data;
          }, data => {
            console.error(data)
          })
      }; 
    });
  
  // angular.module('youTubeCtrl', ['youtube-embed'])
  //   .controller('main', function($scope) {
  //     $scope.theBestVideo = "sMKoNBRZM1M";
  //   })
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
  