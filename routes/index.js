var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

  const API_NAME = "api1";
  const API_REQUEST = '/systeminfo?detail=all';

  let appConfig = req.app.get( "appConfig" );

  // Get some data from the API if possible, we want it to be quick so only allow 100ms
  request({url : appConfig.getApiURL(API_NAME) + API_REQUEST, timeout : 100}, function (error, response, body) {
    if ( (response) && (response.statusCode === 200) ) {

      try {
        let jsonData = JSON.parse(body);
        res.render('index', {   title: 'CCS Example App1',
                                statusCode : response.statusCode,
                                featureEG1 : appConfig.isFeatureEnabled("EG1"),
                                data : jsonData });
      }
      catch ( e ) {
        res.render('error', {   message: 'CCS Example App1 - Error parsing response from API.',
                                error : { status : e.message, stack : e } });
      }
    } else {
      res.render('error', {   message: 'CCS Example App1 - Error calling API.',
                              error : { status : response, stack : error } });
    }
  });
});

module.exports = router;
