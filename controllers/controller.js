const User = require('../models/user');
const bcrypt = require('bcryptjs');

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

exports.getSignup = (req, res, next) => {
    res.render('signup');
}

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    
    // insert security stuff here
    bcrypt.hash(password, 10).then(hashedPassword => {
        const user = new User({
            username: username,
            password: hashedPassword
        });
        return user.save();
    }).then(result => {
        res.redirect('/')
    }).catch(err => {console.log(err)})
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username})
        .then(user => {
            if (!user) {
                return res.status(422).render('login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save((err) => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    return res.status(422).render('login');
                }).catch(err => {
                    console.log(err);
                    res.redirect('/login')
                })
        }).catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    });
};