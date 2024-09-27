import express from "express";
import AuthController from "./auth.controller";

const router = express.Router();

router.get("/user", AuthController.getUser);
router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/signout", AuthController.signout);

export default router;
