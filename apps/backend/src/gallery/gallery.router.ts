import express from "express";
// add var { checkSchema } = require('express-validator');

import { authProtectionMiddleware } from "../../middleware/auth-protection.middleware";
import GalleryController from "./gallery.controller";

const router = express.Router();

router.get("/", authProtectionMiddleware, GalleryController.getGalleryMovies);
router.post("/", authProtectionMiddleware, GalleryController.addGalleryMovie);
router.patch(
  "/",
  authProtectionMiddleware,
  GalleryController.updateGalleryMovie
);
router.post(
  "/upload-poster",
  authProtectionMiddleware,
  GalleryController.uploadPoster
);

export default router;
