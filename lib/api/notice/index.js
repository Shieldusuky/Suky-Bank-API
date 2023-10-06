var express = require('express');
var router = express.Router();

var viewBoard = require("./viewBoard");

router.use('/viewBoard', viewBoard);

module.exports = router;
