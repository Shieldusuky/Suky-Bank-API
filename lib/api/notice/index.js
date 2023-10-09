var express = require('express');
var router = express.Router();

var deleteBoard = require("./deleteBoard");
var editBoard = require("./editBoard");
var getBoard = require("./getBoard");
var viewBoard = require("./viewBoard");
var writeBoard = require("./writeBoard");
// var download = require("./download");
var admcheck = require("./admcheck");
var uploadBoard = require("./uploadBoard");



router.use('/deleteBoard', deleteBoard);
router.use('/editBoard', editBoard);
router.use('/getBoard', getBoard);
router.use('/viewBoard', viewBoard);
router.use('/writeBoard', writeBoard);
// router.use('/download', download);
router.use('/admcheck', admcheck);
router.use('/uploadBoard', uploadBoard);

module.exports = router;
