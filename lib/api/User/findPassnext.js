var express = require('express');
var router = express.Router();
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var { encryptResponse, decryptRequest } = require("../../../middlewares/crypt");

/**
 * Change password route
 * This endpoint allows the user to change password
 * @path - /api/user/change-password
 * @middleware
 * @param username - 사용자 이름
 * @param next_new_password - 이전 비밀번호
 * @param check_password - 새로운 비밀번호
 * @return - 상태
 */
router.post('/', decryptRequest, (req, res) => {
    var r = new Response();
    let username = req.body.username;
    let next_new_password = req.body.next_new_password;
    let check_password = req.body.check_password;
    
    Model.users.findOne({
        where: {
            username: username
        },
        attributes: ["username","password"]
    }).then((user) => { // user 변수 추가
        if (user) {
            if (user.password == next_new_password) { // user.password 수정
                r.status = statusCodes.BAD_INPUT;
                r.data = {
                    "message": "현재 비밀번호와 새 비밀번호는 같을 수 없습니다."
                };
                return res.json(encryptResponse(r));
            } else {
                if (next_new_password == check_password) {
                    Model.users.update({
                        password: next_new_password
                    }, {
                        where: {
                            username: user.username
                        }
                    }).then(() => {
                        r.status = statusCodes.SUCCESS;
                        r.data = {
                            "message": "비밀번호가 성공적으로 변경되었습니다."
                        };
                        return res.json(encryptResponse(r));
                    }).catch((err) => {
                        r.status = statusCodes.SERVER_ERROR;
                        r.data = {
                            "message": err.toString()
                        };
                        res.json(encryptResponse(r));
                    });
                } else {
                    r.status = statusCodes.BAD_REQUEST;
                    r.data = {
                        "message": "비밀번호가 일치하지 않습니다."
                    };
                    return res.json(encryptResponse(r));
                }
            }
        } else {
            r.status = statusCodes.BAD_INPUT;
            r.data = {
                "message": "user이 없음"
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
