const express = require('express');
const { createTeam } = require('../controllers/teams');
const { createRecord, updateRecord } = require('../controllers/records');
const { getResult } = require('../controllers/competitions');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to Competition Management API Server!'));
router.get('/competitions/:competitionId/result', getResult);
router.post('/competitions/:competitionId/teams', createTeam);
router.post('/competitions/:competitionId/teams/:teamId/record', createRecord);
router.patch('/competitions/:competitionId/teams/:teamId/record', updateRecord);

module.exports = router;
