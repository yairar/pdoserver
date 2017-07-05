var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Routes
var index = require('./routes/index');
var events = require('./routes/events');
app.use('/', index);
app.use('/api', events);


// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// Static folder
app.use(express.static(path.join(__dirname, 'client')));


// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var PORT = 3000;
app.listen(PORT, function(){
    console.log('Server is up on port'+PORT);
});