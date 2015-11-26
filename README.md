# AddressBookClient test task application.

Used technologies and products:
JS frameworks: AngularJS, JQuery
CSS framework: Bootstrap

The application calls the RESTful service by URLs:

List of persons, GET request: http://appserver01-rustems.rhcloud.com/rest-service/person/list
Get person by id, GET request: http://appserver01-rustems.rhcloud.com/rest-service/person/show/{id}
Create person, POST request: http://appserver01-rustems.rhcloud.com/rest-service/person/create
Update person by id, POST request: http://appserver01-rustems.rhcloud.com/rest-service/person/update/{id}
Delete person by id, DELETE request: http://appserver01-rustems.rhcloud.com/rest-service/person/delete/{id}

Source located in Git repository: https://github.com/rustem-s/AddressBookClient