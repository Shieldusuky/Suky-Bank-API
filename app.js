const express = require("express");
const app = express();
const index = require('./routes/index');
var logger = require('morgan');

app.use(express.json());

app.use('/api', index);
app.use(logger('dev'));

// 정적 파일을 제공할 폴더를 지정합니다.
app.use('/lib/file', express.static(__dirname + '/lib/file'));

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "lib/file", filename);
  res.download(filePath);
});

module.exports = app;
