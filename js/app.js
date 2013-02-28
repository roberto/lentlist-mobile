persistence.store.websql.config(persistence, 'lentlist',
                                'Lent list', 5 * 1024 * 1024);

var Item = persistence.define('Item', {name: "TEXT", borrower: "TEXT"});

function ListCtrl($scope) {
  //$scope.items = [
  //  {title:'Kindle', borrower: 'Renata', returned:true},
  //  {title:'Game', borrower: 'Juca', returned:false}];

  $scope.items = []
  Item.all().list(null, function(results){
    results.forEach(function(r){
      console.log(r);
      $scope.items.push(r);
    });
  });
  console.log($scope.items);
  $scope.addItem = function() {
    var item = new Item({title:$scope.itemTitle, borrower:$scope.itemBorrower, returned: false});
    persistence.add(item);
    //$scope.items.push({title:$scope.itemTitle, borrower:$scope.itemBorrower, returned:false});
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
    var oldItems = $scope.items;
    $scope.items = [];
    angular.forEach(oldItems, function(item) {
      if (!item.returned) $scope.items.push(item);
    });
  };

  $scope.retrieveAll = function() {
    $scope.items = [];
    Item.all().list(null, function(results){
      results.forEach(function(r){
        $scope.items.push(r);
      });
    });
  };
}



