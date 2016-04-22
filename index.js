var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var HttpError = require('./middleware/errorHandling');
var authChecker = require('./middleware/authChecker');

app = express();

app.use(HttpError.HttpError);
app.use(authChecker.authChecker);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(morgan('dev'));

require('./routes')(app);

app.get('/', function (request, response) {
    response.send('It works!\n');
});

app.listen(3000);
console.log('Yay');

