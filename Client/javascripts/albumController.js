var albumCollection = angular.module('albumCollection', []);

albumCollection.controller('albumListCtrl', function($scope) {
    $scope.collection = [
        {'title': 'I-Empire', 'artist': 'Angels & Airwaves', 'year': 2007},
        {'title': 'Megalithic Symphony', 'artist': 'Awolnation', 'year': 2011},
        {'title': 'Night Visions', 'artist': 'Imagine Dragons', 'year': 2012}
    ];
});
