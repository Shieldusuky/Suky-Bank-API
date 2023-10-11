var express = require('express');
var router = express.Router();

var deleteBoard = require("./deleteBoard");
var editBoard = require("./editBoard");
var getBoard = require("./getBoard");
var viewBoard = require("./viewBoard");
var writeBoard = require("./writeBoard");
var admcheck = require("./admcheck");
var uploadBoard = require("./uploadBoard");
var test = require("./test");
// var download = require("./download");

router.use('/deleteBoard', deleteBoard);
router.use('/editBoard', editBoard);
router.use('/getBoard', getBoard);
router.use('/viewBoard', viewBoard);
router.use('/writeBoard', writeBoard);
router.use('/admcheck', admcheck);
router.use('/uploadBoard', uploadBoard);
router.use('/test', test);
// router.use('/download', download);

module.exports = router;