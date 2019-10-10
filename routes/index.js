const express = require('express');
const { createTeam } = require('../controllers/teams');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to Competition Management API Server!');
});

router.get('/competitions/:competitionId/result', (req, res) => {
    res.send({});
});

router.post('/competitions/:competitionId/teams', createTeam);

router.post('/competitions/:competitionId/teams/:teamId/record', (req, res) => {
    res.send({});
});

router.patch('/competitions/:competitionId/teams/:teamId/record', (req, res) => {
    res.send({});
});

module.exports = router;
