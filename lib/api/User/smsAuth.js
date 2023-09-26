var express = require('express');
var router = express.Router();
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var { encryptResponse, decryptRequest } = require("../../../middlewares/crypt");
var ejs = require('ejs');

const ERROR_MESSAGES = {
    BAD_INPUT: "Incorrect Certification Number",
    SERVER_ERROR: "Server error occurred",
};

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.set('views', __dirname + '/views');

/**
 * findPass route
 * This endpoint allows the user to login
 * @path                             - /api/user/smsAuth
 * @middleware                       - Checks admin authorization
 * @param username                   - username to smsAuth
 * @param phone                      - phone to smsAuth
 * @param authnum                    - authnum to smsAuth
 * @return                           - JWT token
 */

router.post('/', decryptRequest, (req, res) => {
    const username = req.body.username;
    const phone = req.body.phone;

    res.render('result', { username, phone });
})

router.post('/', decryptRequest, (req, res) => {
    const r = new Response();
    const { username, phone, authnum } = req.body;

    Model.smsauth.findOne({
        where: {
            username : username,
            authnum : authnum
        }
    }).then((data) => {
        if (data) {
            r.status = statusCodes.SUCCESS;
            r.data = {
                "message": "correct Certification Number"
            };
        } else {
            r.status = statusCodes.BAD_INPUT;
            r.data = {
                "message": ERROR_MESSAGES.BAD_INPUT
            };
        }
        return res.json(encryptResponse(r));
    }).catch((err) => {
        console.error(err);
        r.status = statusCodes.SERVER_ERROR;
        r.data = {
            "message": ERROR_MESSAGES.SERVER_ERROR
        };
        return res.json(encryptResponse(r));
    });
});

module.exports = router;