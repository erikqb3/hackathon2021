exports.getIndex = (req, res, next) => {
    res.render('index');
}

exports.getProfile = (req, res, next) => {
    res.render('profile')
}

exports.getAbout = (req, res, next) => {
    res.render('about')
}

exports.getGame = (req, res, next) => {
    res.render('game')
}

exports.getLibrary = (req, res, next) => {
    res.render('library')
}

exports.getLeaderboard = (req, res, next) => {
    res.render('leaderboard')
}

exports.getContact = (req, res, next) => {
    res.render('contact')
}