var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();
let port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
} else {
    port = 3001;
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Endpoint not found.');
    err.status = 404;
    next(err);
});

// error handlers

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

app.set('port', port);

var server = app.listen(port, function () {
    console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;