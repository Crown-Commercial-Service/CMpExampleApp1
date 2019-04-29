var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');

/* GET home page. */
router.get('/', function(req, res, next) {

  // Get a list of Objects from the S3 bucket
  var bucketName = process.env["CCS_APP_API_DATA_BUCKET"]; 

  var s3 = new AWS.S3();

  var params = { 
    Bucket: bucketName
  }
  
  s3.listObjects(params, function (err, data) {
    if(err) {
      console.log(err);
      res.render('aws', {   title: 'CCS Example App1 - AWS Test',
                            bucketName : bucketName,
                            s3Objects : [],
                            errorMessage : err });
    } else {
      console.log(data);
      res.render('aws', {   title: 'CCS Example App1 - AWS Test',
                            bucketName : bucketName,
                            s3Objects : data.Contents });
    }
  });

});

module.exports = router;
