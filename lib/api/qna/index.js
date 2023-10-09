var express = require('express');
var router = express.Router();

var deleteBoard = require("./deleteBoard");
var editBoard = require("./editBoard");
var getBoard = require("./getBoard");
var viewBoard = require("./viewBoard");
var writeBoard = require("./writeBoard");
// var addComment = require("./addComment");
var admusrcheckBoard = require("./admusrcheck");
var admcheckBoard = require("./admcheck");

router.use('/deleteBoard', deleteBoard);
router.use('/editBoard', editBoard);
router.use('/getBoard', getBoard);
router.use('/viewBoard', viewBoard);
router.use('/writeBoard', writeBoard);
// router.use('/addComment', addComment);
router.use('/admusrcheck', admusrcheckBoard);
router.use('/admcheck', admcheckBoard);

module.exports = router;
