var foodieApp = angular.module('foodieApp', ['ngRoute']);

foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})
	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

foodieApp.controller('mainController',function($scope) {
	$scope.restaurants = [{
	name: 'Farzi Cafe',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.2',
	cuisines: 'Modern Indian',
	cost: '2200',
	hours: '12 Noon to 1 AM (Mon-Sun)',
	image: 'img/food1.jpg',
	id:'1',
	bestDish: {
					name: 'THE HAMBURGER',
					image: 'http://s.eatthis-cdn.com/media/images/ext/690257152/burger-king-ranked-hamburger.jpg'
}
},
{
name: 'Doon Rasoi',
address: 'B-2, Level 1, Block E , Inner Circle, Connaught Place',
location: 'Connaught Place',
category: 'Casual Dining, Bar',
vote: '3.9',
cuisines: 'Desi Pure',
cost: '2200',
hours: '12 Noon to 1 AM (Mon-Sun)',
image: 'img/food2.jpg',
id: '2',

}]
})

foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
		$location.url('home');
	}
})
foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	$scope.ingredients = [];
	$scope.found = [];
	$scope.getIngredients = function(url) {
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
		$http({
			'method': 'POST',
			'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
			'headers': {
				'Authorization': 'Key d521340f566443269d9e9bad9156d179',
				'Content-Type': 'application/json'
			},
			'data': data
		}).then(function (response) {
				var non_veg = ['chicken','mutton','pork','beef','fish','bacon','egg'];
				var ingredients = response.data.outputs[0].data.concepts;
				for (var i =0;i < ingredients.length;i++) {
				$scope.ingredients.push(ingredients[i].name);
				}
				for(i in non_veg){
					for(j in ingredients){
						if(non_veg[i]==ingredients[j].name)
							{
								$scope.found.push(ingredients[j].name)
							}
						}
					}
			}, function (xhr) {
	        	console.log(xhr);
	        })
		}
	$scope.restaurantId = $routeParams.id;
	var restaurants =  [{
	name: 'Farzi Cafe',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.2',
	cuisines: 'Modern Indian',
	cost: '2200',
	hours: '12 Noon to 1 AM (Mon-Sun)',
	image: 'img/food1.jpg',
	id:'1',
	bestDish: {
					name: 'Kofta-E-Kareem',
					image: 'http://images.indulgexpress.com/uploads/user/imagelibrary/2017/3/24/original/SAN_0325.JPG'
}
},
{
name: 'Marwaadi Bhojanalaya',
address: 'B-2, Level 1, Block E , Inner Circle, Connaught Place',
location: 'Connaught Place',
category: 'Casual Dining, Bar',
vote: '3.9',
cuisines: 'Desi Pure',
cost: '2200',
hours: '12 Noon to 1 AM (Mon-Sun)',
image: 'img/food2.jpg',
id: '2',
bestDish: {
				name: 'Shuddh Vaishnavi Bhojan',
				image: 'http://sindhirasoi.com/wp-content/uploads/2008/02/daalchaawal.jpg'
}
}]
	$scope.restaurant = restaurants[$routeParams.id - 1];
})
