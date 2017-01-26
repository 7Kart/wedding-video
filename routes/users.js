var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post("/login", function (req, res, next) {
    console.log("req", req.body);
    if (req.body.login === "admin" && req.body.password === "admin") {
        req.session['admin'] = true;
        res.redirect('/');
    }
});

router.get("/logout", function (req, res, next) {
    if (req.session.admin == true)
        req.session.admin = false;
    res.redirect('/');
});

module.exports = router;
