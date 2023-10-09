const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Response = require('../../Response');
const statusCodes = require('../../statusCodes');
const { encryptResponse, decryptRequest } = require('../../../middlewares/crypt');

// 업로드된 파일을 저장할 디렉터리 설정
const uploadDir = path.join(__dirname, '../../../file');

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// 파일 업로드 라우트
router.post('/', decryptRequest, upload.single('file'), (req, res) => {
  const r = new Response();

  // 파일이 전송된 경우
  if (req.file) {
    const uploadedFile = req.file;

    const filePath = path.join(uploadDir, uploadedFile.originalname);

    fs.rename(uploadedFile.path, filePath, (err) => {
      if (err) {
        r.status = statusCodes.SERVER_ERROR;
        r.data = { message: err.toString() };
        return res.json(encryptResponse(r));
      }

      r.status = statusCodes.SUCCESS;
      r.data = { message: '파일이 성공적으로 저장되었습니다.' };
      return res.json(encryptResponse(r));
    });
  } else {
    r.status = statusCodes.BAD_REQUEST;
    r.data = { message: '파일이 전송되지 않았습니다.' };
    return res.json(encryptResponse(r));
  }
});

module.exports = router;