const express = require('express');
const router = require('./routes');
const logger = require('./helpers/logger');

const app = express();
const PORT = 8081;

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => logger.info(`Competition Management API Server is listening on port ${PORT}!`));
