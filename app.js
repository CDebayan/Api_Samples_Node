const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const SampleApiRoutes = require('./api/routes/sample_api_routes');

app.use('/images', express.static('images'));
app.use('/videos', express.static('videos'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    //res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type,Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/apisamples', SampleApiRoutes);

app.use((req, res, next) => {
    const error = Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;