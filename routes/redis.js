var express = require('express');
var router = express.Router();

var redis = require("redis");

/* GET home page. */
router.get('/', function(req, res, next) {

  // Get the Redis connection details and create a client
  var redisHost = process.env["CCS_REDIS_HOST"] || "localhost"; 
  var redisPort = process.env["CCS_REDIS_PORT"] || 6379; 

  client = redis.createClient( redisPort, redisHost );

  // Set the current date/time
  client.set("App1_Timestamp", new Date().toString(), redis.print);

  // Increment the counter
  client.incr("App1_Counter");

  // Read the timestamp and counter back
  var multi = client.multi();
  multi.get( "App1_Timestamp" );
  multi.get( "App1_Counter" );

  multi.exec( function(err, reply) {
    if(err) {
      console.log(reply);
      res.render('redis', {   title: 'CCS Example App1 - Redis Test',
      redisHost : redisHost,
      redisPort : redisPort,
      errorMessage : err });
    } else {
      console.log(reply);
      res.render('redis', {   title: 'CCS Example App1 - Redis Test',
      redisHost : redisHost,
      redisPort : redisPort,
      timestamp : reply[0],
      counter: reply[1] });
    }  
  });

});

module.exports = router;

