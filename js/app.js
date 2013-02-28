function ListCtrl($scope) {
  $scope.items = [
    {title:'Kindle', borrower: 'Renata', returned:true},
    {title:'Game', borrower: 'Juca', returned:false}];

  $scope.addItem = function() {
    $scope.items.push({title:$scope.itemTitle, borrower:$scope.itemBorrower, returned:false});
    $scope.itemTitle = '';
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.items, function(item) {
      count += item.returned ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldItems = $scope.items;
    $scope.items = [];
    angular.forEach(oldItems, function(item) {
      if (!item.returned) $scope.items.push(item);
    });
  };
}


