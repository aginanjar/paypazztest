process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = require('assert');

let server = require('../index');
let knex = require('../db/knex');
let should = chai.should();
let jwt = require('jsonwebtoken');
let config = require('../config');
let dummytoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkbWluIiwiaWF0IjoxNTU0MzY4ODI4LCJleHAiOjE1NTQ0NTUyMjh9.8hILIpkJ5n7srUm3IfxsPJm1sk0wbWZhLmRhmdiMS5M';


chai.use(chaiHttp);

module.exports = {
    chai,
    chaiHttp,
    assert,
    server,
    should,
    jwt,
    knex,
    config,
    dummytoken
}