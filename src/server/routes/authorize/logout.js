module.exports = function(app) { 

    app.get('/logout', (req, res) => {
        req.session.loggedIn = false;
        delete req.session.user;
        res.send({ loggedIn: false, user: req.session.user });
    });
}