const express = require('express');
const app = express();
const db = require('./db');
const api = require('./api');
const path = require('path');

const port = 3000;

app.use(express.json())
app.use('/api', api)
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

db.syncAndSeed()
    .then( () => {
        app.listen(port, () => console.log(`listening on port ${port}`));
    });
