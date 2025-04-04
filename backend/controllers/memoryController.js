const Save = require('../models/save');

/**
 * Save a new game result
 * @param req - Express request object with game data in the body
 * @param  req.body - Request body containing game data
 * @param  req.body.userID - ID of the user who played the game
 * @param  req.body.gameDate - Date when the game was played
 * @param  req.body.failed - Number of failed attempts
 * @param  req.body.difficulty - Game difficulty level (Easy, Normal, Hard)
 * @param  req.body.completed - Whether the game was completed (1) or not (0)
 * @param  req.body.timeTaken - Time taken to complete the game in seconds
 * @param res - Express response object
 */
exports.saveGameData = async (req, res) => {
    const { userID, gameDate, failed, difficulty, completed, timeTaken } = req.body;

    console.log('Received data to save:', req.body);

    try {

        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSave = new Save({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });

        await newSave.save();
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};

/**
 * Get all game results for a specific user with pagination
 * @param  req - Express request object
 * @param  res - Express response object
 */
exports.getUserGameResults = async (req, res) => {
    try {
        const { userID } = req.params;
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 results per page
        const skip = (page - 1) * limit; // Calculate how many results to skip

        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find all game results for the specified user, sorted by date (newest first) with pagination
        const gameResults = await Save.find({ userID })
            .sort({ gameDate: -1 }) // Sort by date, newest first
            .skip(skip) // Skip the calculated number of results
            .limit(limit) // Limit the number of results returned
            .select('-__v'); // Exclude the version field

        if (gameResults.length === 0) {
            return res.status(404).json({ message: 'No game results found for this user' });
        }

        // Count total results for pagination
        const totalResults = await Save.countDocuments({ userID });

        res.status(200).json({
            totalResults,
            page,
            totalPages: Math.ceil(totalResults / limit),
            resultsPerPage: limit,
            results: gameResults
        });
    } catch (error) {
        console.error('Error fetching user game results:', error);
        res.status(500).json({ message: 'Error fetching game results', error: error.message });
    }
};
