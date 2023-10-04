var express = require('express');
var router = express.Router();
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var { encryptResponse, decryptRequest } = require("../../../middlewares/crypt");

const ERROR_MESSAGES = {
    BAD_INPUT: "Incorrect Certification Number",
    SERVER_ERROR: "Server error occurred",
};

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
    const r = new Response();
    const { username, authnum } = req.body;

    Model.smsauth.findOne({
        where: {
            username : username
        },
        attributes: ["username","authnum"]
    }).then((user) => {
        if (user) {
            r.status = statusCodes.SUCCESS;
            r.data = {
                "message": "correct Certification Number"
            };
            return res.json(encryptResponse(r));
        } else {
            r.status = statusCodes.BAD_INPUT;
            r.data = {
                "message": ERROR_MESSAGES.BAD_INPUT
            };
            return res.json(encryptResponse(r));
        }
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