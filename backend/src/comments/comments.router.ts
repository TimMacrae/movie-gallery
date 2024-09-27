import express from "express";
// add var { checkSchema } = require('express-validator');

import { authProtectionMiddleware } from "../../middleware/auth-protection.middleware";
import CommentController from "./comments.controller";

const router = express.Router();

router.post("/", CommentController.getComments);
router.post(
  "/create",
  authProtectionMiddleware,
  CommentController.createComment
);

export default router;
