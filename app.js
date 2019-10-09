const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Competition Management API Server!');
});

app.listen(8081, () => console.log('Competition Management API Server is listening on port 8081!'));
