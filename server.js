// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// my API end point
app.get('/api/timestamp/:time?', (req, res) => {
  let date;
    if (req.params.time == undefined)
    {
      date = new Date();
      res.json( {unix: date.getTime(), utc: date.toUTCString()});
    }
    date = new Date(
        // check id utc or unix
        /\d+-\d+-\d+/.test(req.params.time) ? req.params.time : Number.parseInt(req.params.time, 10)
    );
    if(isNaN(date.getTime())){
         res.json({error: 'Invalid Date'});
    }
    res.json( {unix: date.getTime(), utc: date.toUTCString()} );
});