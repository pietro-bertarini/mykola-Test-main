const express = require('express');
const { saveGameData, getUserGameResults } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);

// Route to get game results for a specific user
router.get('/results/user/:userID', getUserGameResults);

module.exports = router;
