const app = angular.module("app", []).controller("controller", Controller);

function Controller($scope) {
  $scope.searchTopic = "";

  $scope.tableData = [
    {
      id: 1,
      topic: "React",
      contributions: 10,
      tests: 5
    },
    {
      id: 2,
      topic: "React-native",
      contributions: 10,
      tests: 5
    },
    {
      id: 3,
      topic: "Flux",
      contributions: 10,
      tests: 5
    },
    {
      id: 4,
      topic: "Flow",
      contributions: 10,
      tests: 5
    },
    {
      id: 5,
      topic: "Jest",
      contributions: 10,
      tests: 5
    }
  ];
}
