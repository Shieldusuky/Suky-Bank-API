var express = require('express');
var router = express.Router();
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var { validateUserToken } = require("../../../middlewares/validateToken");
var { encryptResponse, decryptRequest } = require("../../../middlewares/crypt");

/**
 * Change password route
 * This endpoint allows the user to change password
 * @path                             - /api/user/change-password
 * @middleware
 * @param next_new_password                   - Previous password
 * @param check_password               - New password
 * @return                           - Status
 */
router.post('/', [validateUserToken, decryptRequest], (req, res) => {
    var r = new Response();
    let next_new_password = req.body.next_new_password;
    let check_password = req.body.new_password;
    Model.users.findOne({
        where: {
            account_number: req.account_number
        },
        attributes: ["account_number", "password"]
    }).then((user) => {        
        if (user) {
            if (user.password == next_new_password) {
                r.status = statusCodes.BAD_INPUT;
                r.data = {
                    "message": "Current password and new password cannot be the same"
                };
                return res.json(encryptResponse(r));
            } else if (user.id === req.body.id) {
                if (next_new_password === check_password) {
                    Model.users.update({
                        password: next_new_password
                    }, {
                        where: {
                            account_number: user.account_number
                        }
                    }).then(() => {
                        r.status = statusCodes.SUCCESS;
                        r.data = {
                            "message": "Password changed successfully"
                        };
                        return res.json(encryptResponse(r));
                    });
                } else {
                    r.status = statusCodes.BAD_REQUEST;
                    r.data = {
                        "message": "Passwords do not match"
                    };
                    return res.json(encryptResponse(r));
                }
            } else {
                r.status = statusCodes.NOT_AUTHORIZED;
                r.data = {
                    "message": "Not authorized"
                };
                return res.json(encryptResponse(r));
            }
        } else {
            r.status = statusCodes.NOT_AUTHORIZED;
            r.data = {
                "message": "Not authorized"
            };
            return res.json(encryptResponse(r));
        }
    }).catch((err) => {
        r.status = statusCodes.SERVER_ERROR;
        r.data = {
            "message": err.toString()
        };
        res.json(encryptResponse(r));
    });
});

module.exports = router;