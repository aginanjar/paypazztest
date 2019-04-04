let express = require('express');
let router = express.Router();

// All controllers are here ...
let auth = require('../controllers/auth');
let company = require('../controllers/company');


router.get('/', function(req, res, next) {
  res.json({"message":"Ahsiap"});
});

// Sign In 
router.post('/sign-in', auth.signIn);

// Company
router.get('/company/shows', [auth.verifyToken], company.show);
router.post('/company/create', [auth.verifyToken], company.create);

// Employee



module.exports = router;
