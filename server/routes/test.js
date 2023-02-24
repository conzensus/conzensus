var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.ws('/wsconn', function(ws, req) {
  ws.on('message', msg => ws.send(msg));
});

module.exports = router;
