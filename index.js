'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Multer = require('multer');
const config = require('./config');
const videoRoutes = require('./routes/video-routes');

const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', videoRoutes.routes);
app.listen(config.port,() => console.log('App is listening in url http://localhost:' + config.port))

