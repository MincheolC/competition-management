const express = require('express');
const { createTeam } = require('../controllers/teams');
const { createRecord, updateRecord } = require('../controllers/records');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to Competition Management API Server!'));
router.get('/competitions/:competitionId/result', (req, res) => {
    res.send({});
});
router.post('/competitions/:competitionId/teams', createTeam);
router.post('/competitions/:competitionId/teams/:teamId/record', createRecord);
router.patch('/competitions/:competitionId/teams/:teamId/record', updateRecord);

module.exports = router;
