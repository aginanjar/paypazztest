let express = require('express');
let router = express.Router();

// All controllers put here ...
let auth = require('../controllers/auth');
let company = require('../controllers/company');
let employee = require('../controllers/employee');

// Routes begin
router.get('/', function(req, res, next) {
  res.json({"message":"Ahsiap"});
});

// Sign In 
router.post('/sign-in', auth.signIn);

// Company
router.get('/company/shows', [auth.verifyToken], company.show);
router.post('/company/create', [auth.verifyToken], company.create);
router.patch('/company/update', [auth.verifyToken], company.update);
router.get('/company/get/:id', [auth.verifyToken], company.getById);
router.delete('/company/delete/:id', [auth.verifyToken], company.delete);

// Employee
router.get('/employee/shows', [auth.verifyToken], employee.show);
router.post('/employee/create', [auth.verifyToken], employee.create);
router.patch('/employee/update', [auth.verifyToken], employee.update);
router.get('/employee/get/:id', [auth.verifyToken], employee.getById);
router.delete('/employee/delete/:id', [auth.verifyToken], employee.delete);


module.exports = router;
