const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) =>
	res.render('profile', { user: req.user, title: 'Profile Page' })
);

module.exports = router;
