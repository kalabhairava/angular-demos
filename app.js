const app = angular
  .module("app", ["ngResource"])
  .controller("controller", Controller);

Controller.$inject = ["$scope", "$http", "$resource"];

function Controller($scope, $http, $resource) {
  // const URL = "https://dog.ceo/api/breeds/list";

  // $http({ method: "GET", url: URL }).then(
  //   response => {
  //     $scope.breeds = response.data.message;
  //     console.log(response);
  //   },
  //   error => {
  //     alert("ERROR!!! ERROR!!!");
  //   }
  // );

  // $resource(
  //   URL,
  //   {},
  //   {
  //     query: {
  //       method: "GET"
  //     }
  //   }
  // ).$promise.then(
  //   response => {
  //     $scope.breeds = response.data.message;
  //     console.log(response);
  //   },
  //   error => {
  //     alert("ERROR!!1");
  //   }
  // );

  // const a = $resource(URL);

  // const response = a.get();

  // response.$promise.then(
  //   response => {
  //     console.log(response);
  //     $scope.breeds = response.message;
  //     console.log(response);
  //   },
  //   error => {
  //     alert("ERROR!!1");
  //   }
  // );

  // console.log(a);

  const muleSoftBaseUrl =
    "https://mocksvc.mulesoft.com/mocks/21bf111b-a6fb-4b78-8cb6-5066cd3dfd0b";

  var PARAMS = {
    GET_PENDING_TRANSFERS: {
      gaId: "@gaId",
      indId: "@indId"
    },
    POST_CANCEL_REQUEST: {
      gaId: "@gaId",
      indId: "@indId",
      evId: "@evId"
    }
  };

  var URL = {
    MOCK: {
      GET_PENDING_TRANSFERS:
        muleSoftBaseUrl + "/cancelTransfer/pendingTransfers",
      POST_CANCEL_REQUEST: muleSoftBaseUrl + "/cancelTransfer/doCancel"
    }
  };

  const getPendingTransfersUrl = URL.MOCK.GET_PENDING_TRANSFERS;
  const postCancelRequestUrl = URL.MOCK.POST_CANCEL_REQUEST;

  const factory = {
    // get all pending transfers
    getPendingTransfers: $resource(
      getPendingTransfersUrl,
      PARAMS.GET_PENDING_TRANSFERS,
      {
        query: {
          method: "GET",
          isArray: false,
          withCredentials: false
        }
      }
    ),

    // post request to cancel a transfer
    postCancelRequest: $resource(
      postCancelRequestUrl,
      PARAMS.POST_CANCEL_REQUEST,
      {
        query: {
          method: "POST",
          isArray: false,
          withCredentials: false
        }
      }
    )
  };

  const params = {
    gaId: 123 - 01,
    indId: 123
  };

  const postParams = {
    gaId: 123 - 01,
    indId: 123,
    evId: 123
  };

  factory.getPendingTransfers
    .query(params)
    .$promise.then(
      response => console.log("pending", response),
      error => console.log(error)
    );

  factory.postCancelRequest
    .query(postParams)
    .$promise.then(
      response => console.log("cancel via resource", response),
      error => console.log(error)
    );

  $http({
    method: "POST",
    url: `${postCancelRequestUrl}?evId=${postParams.evId}&gaId=${
      postParams.gaId
    }&indId=${postParams.indId}`
  }).then(
    response => console.log("cancel via http", response),
    error => console.log(error)
  );
}
