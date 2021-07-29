const router = require('express').Router();
const path = require('path');

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..public/index.html'));
    });

    app.get('/exercise', (req, res) => {
        console.log('clicked');
        res.sendFile(path.join(__dirname, '..public/exercise.html'));
    });

    app.get('/stats', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    });
};

module.exports = router;