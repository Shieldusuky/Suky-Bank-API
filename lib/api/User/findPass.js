var express = require('express');
var router = express.Router();
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var { encryptResponse, decryptRequest } = require("../../../middlewares/crypt");

/**
 * findPass route
 * This endpoint allows the user to login
 * @path                             - /api/user/findPass
 * @middleware                       - Checks admin authorization
 * @param username                         - username to findPass
 * @param phone                      - phone to findPass
 * @return                           - JWT token
 */
router.post('/', decryptRequest, (req, res) => {
    var r = new Response();
    let username = req.body.username;
    let phone = req.body.phone;

    Model.users.findOne({
        where: {
            username: username,
            phone: phone
        }
    }).then((data) => {
        if(data) {
            r.status = statusCodes.SUCCESS;
            r.data = {
                "message" : "correct username and phone"
            };
            return res.json(encryptResponse(r));
        } else {
            r.status = statusCodes.BAD_INPUT;
            r.data = {
                "message": "Incorrect username or phone"
            }
            return res.json(encryptResponse(r));
        }
    }).catch((err) => {
        r.status = statusCodes.SERVER_ERROR;
        r.data = {
            "message": err.toString()
        };
        return res.json(encryptResponse(r));
    });
});

module.exports = router;