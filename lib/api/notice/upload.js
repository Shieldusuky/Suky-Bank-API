const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: '../file' }); // 파일이 저장될 경로를 지정

router.post("/", upload.single('file'), (req, res) => {
  // 파일이 정상적으로 업로드 되었을 경우
  if (req.file) {
    const filename = req.file.originalname;
    const filepath = path.join(__dirname, '../file', filename);
    fs.rename(req.file.path, filepath, (err) => {
      if (err) {
        res.status(500).json({ message: "파일 저장에 실패했습니다." });
      } else {
        res.json({ message: "파일이 업로드 되었습니다.", filename: filename });
      }
    });
  } else {
    res.status(400).json({ message: "파일 업로드에 실패했습니다." });
  }
});

module.exports = router;