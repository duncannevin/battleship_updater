const express = require('express');
const log4js = require('log4js');
const bodyParser = require('body-parser');
const cors = require('cors');

const authenticate = require('./middlewares/authenticate');
const handleError = require('./middlewares/error');

const app = express();
const server = require('http').Server(app);
const expressWs = require('express-ws')(app, server);

const wsRoutes = require('./routes/ws');
const updateRoutes = require('./routes/update');

app.use(cors());
app.use(bodyParser.json());
app.use(log4js.connectLogger(log4js.getLogger('http'), {level: 'auto'}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(authenticate);
app.use('/ws', wsRoutes);
app.use('/update', updateRoutes);
app.use(handleError);

module.exports = {app, server, expressWs};
