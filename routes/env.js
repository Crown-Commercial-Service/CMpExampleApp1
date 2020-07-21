var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // Sanitize local environment variables
  let localEnv = {};
  Object.keys(process.env).map(function(key, index) {
    if ( key.endsWith("PASSWORD") ) {
      localEnv[key] = "********";
    } else {
      localEnv[key] = process.env[key];
    }
  });

  res.render('env', { 
    title : "CCS Example App1 - Environment page",
    localEnv : localEnv } );

});

module.exports = router;
