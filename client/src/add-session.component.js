angular.module("basketballTrainingApp")
  .component("addSession", {
    template: `
      <form ng-submit="addUserSession()" action="/" method="POST">
        <input type="text" ng-model="drillType" placeholder="Drill Type" name="type">
        <input type="text" ng-model="drillName" placeholder="Drill Name" name="name">
        <input type="text" ng-model="drillDuration" placeholder="Your time" name="duration">
        <button type="submit">Add Session</button>
      </form>
      <br>
      <div ng-repeat="userSession in userSessions">
        <input type="checkbox" ng-model="userSession.sucess"> 
        <span ng-bind="userSession.type"></span>
        <span ng-bind="userSession.name"></span>
        <span ng-bind="userSession.duration"></span>

      </div>

      <p><button ng-click="removeSession()">Remove</button></p>
    `,
    controller: function addSessionCtrl($scope) {
      $scope.userSessions = [{type: 'Defense', name: 'Full Court Shuffle', duration: '15 seconds'}];

      $scope.addUserSession = function() {
        $scope.userSessions.push({type: $scope.drillType, name: $scope.drillName, duration: $scope.drillDuration, sucess: false})

        $scope.drillType = "";
        $scope.drillName = "";
        $scope.drillDuration = "";
      }
      $scope.removeSession = function() {
        console.log('remove');
        let oldSessions = $scope.userSessions;
        $scope.userSessions = [];
        angular.forEach(oldSessions, (session) => {
          console.log(session);
          if (!session.sucess) $scope.userSessions.push(session);
        }) 
      }
    }
});
