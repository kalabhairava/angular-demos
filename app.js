const app = angular.module('app', ['ngResource']).controller('controller', Controller);

Controller.$inject = ['$scope', '$http', '$resource'];

function Controller($scope, $http, $resource) {
  $scope.searchText = '';

  const SEPARATOR = ' ';

  $scope.onSearchTextChange = function() {
    const searchText = $scope.searchText;
    const tokens = searchText.split(SEPARATOR);

    getSuggestions(tokens[tokens.length - 1]).then(onGetSuggestionsSuccess, onGetSuggestionsFailure);

    function onGetSuggestionsSuccess(results) {
      $scope.results = results;

      // Trigger digest cycle manually - https://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-AngularJS
      // The digest cycle won't be run when you execute JS code outside of angular context.
      // In this case, it is happening because of server code written at the bottom
      $scope.$apply();
    }

    function onGetSuggestionsFailure(error) {
      $scope.results = [];

      // Trigger digest cycle
      $scope.$apply();
    }

    $scope.updateInputBox = function(value) {
      let tokens = $scope.searchText.split(SEPARATOR);

      tokens[tokens.length - 1] = value + ' ';

      $scope.searchText = tokens.join(' ');
      $scope.results = [];

      document.getElementById('search').focus();
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
  var pre = 'pre';
  var post = 'post';
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
