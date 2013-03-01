persistence.store.websql.config(persistence, 'lentlist', 'lentlist', 5 * 1024 * 1024);

var Item = persistence.define('Item', {title: "TEXT", borrower: "TEXT", returned: "BOOL"});

persistence.schemaSync();

function ListCtrl($scope) {
  $scope.items = []
  Item.all().list(null, function(results){
    results.forEach(function(r){
      $scope.items.push(r);
      $scope.$apply();
    });
  });

  $scope.addItem = function() {
    var item = new Item({title:$scope.itemTitle, borrower:$scope.itemBorrower, returned: false});
    persistence.add(item);
    $scope.itemTitle = '';
    $scope.itemBorrower = '';
    $scope.items.push(item);
    persistence.flush();
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.items, function(item) {
      count += item.returned ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    Item.all().filter("returned", "=", true).list(null, function(returnedItems){
      returnedItems.forEach(function(returnedItem){
        persistence.remove(returnedItem);
        index = $scope.items.indexOf(returnedItem);
        $scope.items.splice(index, 1);
      });
      persistence.flush();
      $scope.$apply();
    });
  };
}



