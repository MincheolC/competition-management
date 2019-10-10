const express = require('express');
const router = require('./routes');
const logger = require('./helpers/logger');

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(8081, () => logger.info('Competition Management API Server is listening on port 8081!'));
