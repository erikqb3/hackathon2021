const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.getIndex);
router.get('/profile', controller.getProfile);
router.get('/about', controller.getAbout);
router.get('/game', controller.getGame);
router.get('/library', controller.getLibrary);
router.get('/leaderboard', controller.getLeaderboard);
router.get('/contact', controller.getContact)

module.exports = router;