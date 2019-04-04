# Example of Restful with NodeJS, PostgreSql and Docker
This API is built with :
* Node JS version : 8.15.0
* npm version : 6.4.1
* Docker : 2.0.0.2 (30215)
* postgre Sql : 11.2

Packages :
* Expressjs
* Knex
* Pg
* jsonwebtoken
* body-parser
* mocha and chai _for further detail, can check on package.json_

For starting this API : 
* Open your favorite terminal 
* Start your Docker
* Clone the repo first with ```git clone git@github.com:aginanjar/paypazztest.git```
* Switch directory with ```cd paypazztest```
* Pull the docker with ```docker-compose up -d```, wait for the seconds.
* And you can access the API at ```http://localhost:811```
 
 The list of API(s) :

* get :  http://localhost:811/api/v1/sign-in
* get : http://localhost:811/api/v1/company/shows: 
* post : http://localhost:811/api/v1/company/create: 
* patch : http://localhost:811/api/v1/company/update: 
* get : http://localhost:811/api/v1/company/get/:id: 
* delete : http://localhost:811/api/v1/company/delete/:id: 
* get : http://localhost:811/api/v1/employee/shows: 
* post : http://localhost:811/api/v1/employee/create: 
* patch : http://localhost:811/api/v1/employee/update: 
* get : http://localhost:811/api/v1/employee/get/:id: 
* delete : http://localhost:811/api/v1/employee/delete/:id: 
 
