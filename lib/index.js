var express = require('express'),
utils = require('./utils');

var app = express();

// Handle request
app.get('/I/want/title', function (req, res) {

if (!req.query.address) {
    res.send('<h1>No Titles Found</h1>')
} else {
    // Get addresses array out of query params
    var addresses = utils.getUrls(req.query);

    // Append http:// with url string
    utils.appendUrlProtocol(addresses);

    // iterate through address list and make request for each
    // parse html and get titles for each url
    // build html from generated array of objects
    // once completed, send response to callee with populated list
    utils.getAllUrlList(addresses).then(function (titleList) {
        res.send(utils.makeHtml(titleList));
    }).catch(function(error) {
        res.status(500);
        res.send(error);
    });
}
});

// 404 handle
app.get('*', function(req, res) {
res.status(404).send('<h1>404 Not Found</h1>');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;