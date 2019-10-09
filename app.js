const express = require('express');
const router = require('./routes');

const app = express();

app.use('/', router);

app.listen(8081, () => console.log('Competition Management API Server is listening on port 8081!'));
