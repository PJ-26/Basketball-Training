angular.
module("basketballTrainingApp").
component("sessionList", {
  template: `
    <div>
      <span class='sessionTypes' ng-repeat="session in $ctrl.sessions" >{{session.type}}</span>       
    </div>
  `,
  controller: function SessionCtrl() {
    this.sessions = [
      { type: "Shooting", name: "Around The World", duration: "30 seconds" },
      { type: "Passing", duration: "40 seconds" },
      { type: "Dribbling", duration: "50 seconds" },
      { type: "Defense", duration: "60 seconds" }
    ];
  }
});
