var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
app.use(morgan('dev'));

require('./routes')(app);

app.set( 'port', process.env.PORT || 3001 );

var server = app.listen(
    app.get( 'port' ),
    function() {
        console.log( 'Checklist server listening at port: '
            + server.address().port ); }
);
