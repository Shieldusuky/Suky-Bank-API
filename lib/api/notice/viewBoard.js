const express = require("express");
const router = express.Router();
const Model = require("../../../models/index");
const ModelBoard = require("../../../models_board/index");
const Response = require("../../Response");
const statusCodes = require("../../statusCodes");
const { encryptResponse } = require("../../../middlewares/crypt");

function viewBoardMiddleware(req, res, next) {
  var r = new Response();
  // Query to retrieve data from 'notice' table
  ModelBoard.notices.findAll({
      attributes: ["id", "userId", "title", "updatedAt"],
  })
  .then((data) => {
      r.status = statusCodes.SUCCESS;
      r.data = data;
      return res.json(encryptResponse(r));
  })
  .catch((err) => {
      r.status = statusCodes.SERVER_ERROR;
      r.data = {
          message: err.toString(),
      };
      return res.json(encryptResponse(r));
  });
}

module.exports = viewBoardMiddleware;