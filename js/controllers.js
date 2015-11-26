var addressBookApp = angular.module("addressBookApp", [ 'ngResource', 'angularUtils.directives.pagination']);

addressBookApp.controller(
	"AddressBookController",
	[
		'$scope',
		'$resource',
		'$http',
		function($scope, $resource, $http) {

			//var baseUrl = 'http://localhost/rest-service/person';
			var baseUrl = 'http://appserver01-rustems.rhcloud.com/rest-service/person';

			var refresh = function() {

				var personListResource = $resource(baseUrl + '/list');

				personListResource.query(
					function(persons){
						$scope.persons = persons;
					}
				);

				$('#submit-form').hide();
			};

			refresh();

			$scope.new = function(){

				hideNotification();

				$scope.id = '';
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.phone = '';
				$scope.email = '';
				$scope.birthDate = '';
				$scope.address = '';
				$scope.city = '';
				$scope.company = '';

				$('#submit-form').show();
			};

			$scope.edit = function(person){

				hideNotification();

				$scope.id = person.id;
				$scope.firstName = person.firstName;
				$scope.lastName = person.lastName;
				$scope.phone = person.phone;
				$scope.email = person.email;
				$scope.birthDate = new Date(person.birthDate);
				$scope.address = person.address.address;
				$scope.city = person.address.city;
				$scope.company = person.company.name;

				$('#submit-form').show();

			};

			var create = function(){

				var person =
				{
					firstName:$scope.firstName,
					lastName:$scope.lastName,
					phone:$scope.phone,
					email:$scope.email,
					birthDate:$scope.birthDate,
					address:
					{
						address:$scope.address,
						city:$scope.city
					},
					company:
					{
						name:$scope.company
					}
				};

				$http.post(baseUrl + '/create', person )
					.success(function(person, status, headers, config) {
						refresh();
						showNotification('Person ' + person.firstName + ' ' + person.lastName + ' successfully created');
					})
					.error(function(person, status, headers, config) {
						showNotification('Error occured!');
					});

			};

			var update = function(){

				console.log('update');

				var person =
				{
					firstName:$scope.firstName,
					lastName:$scope.lastName,
					phone:$scope.phone,
					email:$scope.email,
					birthDate:$scope.birthDate,
					address:
					{
						address:$scope.address,
						city:$scope.city
					},
					company:
					{
						name:$scope.company
					}
				};

				$http.post(baseUrl + '/update/' + $scope.id, person)
					.success(function(person, status, headers, config) {
						refresh();
						showNotification('Person ' + person.firstName + ' ' + person.lastName + ' successfully updated');
					})
					.error(function(person, status, headers, config) {
						showNotification('Error occured!');
					});

			};

			$scope.remove = function(person){

				hideNotification();

				$http.delete(baseUrl + '/delete/' + person.id)
				.success(function(person, status, headers, config) {
					refresh();
						showNotification('Person successfully deleted');
				})
				.error(function(person, status, headers, config) {
						showNotification('Error occured!');
				});

				refresh();
			};

			$scope.submit = function() {

				if ($scope.id) {

					update();
				} else {

					create();
				}

			};

			$scope.cancel = function() {
				$('#submit-form').hide();
			};

			var showNotification = function(message) {
				$('#notification').show();
				$scope.message = message;
			}

			var hideNotification = function() {
				$('#notification').hide();
				$scope.message = '';

			}

			hideNotification();

		}
	]
);
