const app = angular.module("app", []).controller("controller", Controller);

function Controller($scope) {
  $scope.years = [];
  const currentYear = new Date().getFullYear();
  $scope.selectedYear = currentYear;

  // Populate years from current year till 2015
  for (let i = currentYear; i >= 2015; i--) {
    $scope.years.push(i);
  }

  // Example object in the array 'yearReleases' => {year: 2017, releases: ["17.1", "17.1-Offrelease", "17.2", ...]}
  let yearReleases = $scope.years.map(year => {
    return {
      year,
      releases: getReleases(year)
    };
  });

  $scope.updateReleases = function() {
    // Get all the releases for the year selected in drop-down
    $scope.releases = yearReleases.filter(
      item => item.year === $scope.selectedYear
    )[0].releases;

    // Set the selected release to the first release of the year selected in drop-down
    $scope.selectedRelease = $scope.releases[0];
    // console.log($scope.selectedYear);
    // console.log($scope.selectedRelease);
    // console.log($scope.releases);
  };

  // set releases initially
  $scope.updateReleases();

  /**
   * Get all the releases in a year
   * @param {Number} year
   * @returns {Array} an array of all releases in the given year
   */

  function getReleases(year) {
    // get last 2 digits of the year
    const YY = year.toString().substring(2, 4);
    let releases = [];

    // Every year has 12 releases => 17.1, 17.1-Offrelease, ... 17.6, 17.6-Offrelease
    for (let i = 0; i < 12; i = i + 2) {
      let j = i / 2;
      releases[i] = `${YY}.${j + 1}`;
      releases[i + 1] = releases[i] + "-Offrelease";
    }

    return releases;
  }
}
