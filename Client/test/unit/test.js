describe('albumListCtrl', function() {
  
  beforeEach(module('albumCollection'));
  
  it('should create "collection" model with three albums', inject(function($controller) {
    var scope = {};
    var ctrl  = $controller('albumListCtrl', {$scope:scope});
    
    expect(scope.collection.length).toBe(3);
  }));
  
});