const express = require('express');
const router = express.Router();
const multer = require('multer');

const ModelBoard = require("../../../models_board/index");
const Response = require("../../Response");
const statusCodes = require("../../statusCodes");
const { encryptResponse, decryptRequest } = require("../../../middlewares/crypt");


// Define a custom storage engine
const upload = multer({
  storage: multer.diskStorage({
      destination: function (req, file, cb) {
          console.log(req.body.fid);
          cb(null, "../lib/file");
      },
      filename: function (req, file, cb) {
          cb(null, file.originalname);
      },
  }),
});

router.get('/', (req, res) => {
  res.send('<html><body><h1>Welcome to the file upload page</h1></body></html>');
});

router.post('/', upload.single('imgimg'), (req, res) => {
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