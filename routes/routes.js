const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const isAuth = require('../middleware/is-auth')

router.get('/', controller.getIndex);
router.get('/profile', isAuth, controller.getProfile);
router.get('/about', controller.getAbout);
router.get('/game', controller.getGame);
router.get('/library', controller.getLibrary);
router.get('/leaderboard', controller.getLeaderboard);
router.get('/contact', controller.getContact);
router.get('/signup', controller.getSignup);
router.get('/login', controller.getLogin);

router.post('/signup', controller.postSignup);
router.post('/login', controller.postLogin);
router.post('/logout', controller.postLogout);

module.exports = router;