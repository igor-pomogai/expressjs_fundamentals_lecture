var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var httpErr = require('./middleware/errorHandling');

app = express();

app.use(httpErr);
app.use(authChecker);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(morgan('dev'));

require('./routes')(app);

app.get('/', function (request, response) {
    response.send('It works!\n');
});

app.set('port', process.env.PORT || 3001);

