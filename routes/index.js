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
        let apiResponse = JSON.parse(body);
        res.render('index', {   title: 'CCS Example App1',
                                apiCallOK : true,
                                localEnv : process.env,
                                featureEG1 : appConfig.isFeatureEnabled("EG1"),
                                apiResponse : apiResponse });
      }
      catch ( e ) {
        res.render('index', {   title: 'CCS Example App1 - Error parsing response from API.',
                                apiCallOK : false,
                                localEnv : process.env,
                                featureEG1 : appConfig.isFeatureEnabled("EG1"),
                                apiResponse : null,
                                errorMessage : e.message });

      }
    } else {
      res.render('index', {   title: 'CCS Example App1 - Error calling API.',
                              apiCallOK : false,
                              localEnv : process.env,
                              featureEG1 : appConfig.isFeatureEnabled("EG1"),
                              apiResponse : null,
                              errorMessage : JSON.stringify(error) });
  }
  });
});

module.exports = router;
