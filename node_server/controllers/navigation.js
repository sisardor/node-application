var Request = require("request"),
    numeral = require("numeral");


module.exports = {
    "index": index
}

function index(req, res) {
    res.render('home', {featuredAds: null});
}