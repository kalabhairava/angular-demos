const app = angular.module("app", ["ngResource"]).controller("controller", Controller);

Controller.$inject = ["$scope", "$http", "$resource"];

function Controller($scope, $http, $resource) {
  $scope.searchText = "";

  const SEPARATOR = " ";

  $scope.onSearchTextChange = function(searchText) {
    const tokens = searchText.split(SEPARATOR);

    const results = getSuggestions(tokens[tokens.length - 1]).then(
      onGetSuggestionsSuccess,
      onGetSuggestionsFailure
    );

    function onGetSuggestionsSuccess(results) {
      $scope.results = results;
    }

    function onGetSuggestionsFailure(error) {
      $scope.results = [];

      alert(error);
    }

    $scope.updateInputBox = function(value) {
      let tokens = $scope.searchText.split(SEPARATOR);

      tokens[tokens.length - 1] = value + " ";

      $scope.searchText = tokens.join();
      $scope.results = [];

      document.getElementById("search").focus();
    };
  };
}

// ================================= Mock Server Start =============================
var FAILURE_COEFF = 10;
var MAX_SERVER_LATENCY = 200;

function getRandomBool(n) {
  var maxRandomCoeff = 1000;
  if (n > maxRandomCoeff) n = maxRandomCoeff;
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}

function getSuggestions(text) {
  var pre = "pre";
  var post = "post";
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COEFF)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}
// ================================= Mock Server End =============================

// =============
