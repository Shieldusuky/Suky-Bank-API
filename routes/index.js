const express = require("express");
const router = express.Router();

const healthRouter = require("../lib/api/Health");
const transactionsRouter = require("../lib/api/Transactions");
const balanceRouter = require("../lib/api/Balance");
const beneficiaryRouter = require("../lib/api/Beneficiary");
const userRouter = require("../lib/api/User");
const checkRouter = require("../lib/api/Auth");
const noticeRouter = require("../lib/api/notice");
const qnaRouter = require("../lib/api/qna");

router.use("/balance", balanceRouter);
router.use("/transactions", transactionsRouter)
router.use("/health", healthRouter);
router.use("/beneficiary", beneficiaryRouter);
router.use("/user", userRouter);
router.use("/auth", checkRouter);
router.use("/notice", noticeRouter);
router.use("/qna", qnaRouter);

module.exports = router;