const ensureGuest = (req, res, next) => {
	if (req.user) {
		return res.redirect('/profile');
	}
	next();
};

module.exports = ensureGuest;
