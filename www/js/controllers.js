angular.module('starter.controllers', [])

.controller(
		'DashCtrl',
		function($scope, $cordovaBarcodeScanner) {
			$scope.params = {
				barcode : '',
				format : ''
			};

			$scope.scanBarcode = function() {
				$cordovaBarcodeScanner.scan().then(function(barcodeData) {
					$scope.params.barcode = barcodeData.text;
					$scope.params.format = barcodeData.format;
				}, function(error) {
					// An error occurred
				});
			};

			$scope.openUrl = function(type) {

				// google
				var url = "https://www.google.com.tw/webhp?ie=UTF-8#q="
						+ $scope.params.barcode;
				if (type == "books") {
					url = "http://search.books.com.tw/search/query/key/"
							+ $scope.params.barcode + "/cat/all";
				} else if (type == "iguang") {
					url = "http://iguang.tw/x/book/" + $scope.params.barcode;
				}

				
				// for mobile
				var ref = cordova.InAppBrowser.open(url, '_system', 'location=yes');
				
				// for desktop 
				//window.open(url, '_system');				
			};

		})

.controller('ChatsCtrl', function($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	// $scope.$on('$ionicView.enter', function(e) {
	// });

	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends : true
	};
});
