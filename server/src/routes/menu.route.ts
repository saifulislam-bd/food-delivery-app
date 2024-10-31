import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { addMenu, editMenu } from "../controllers/menu.controller";
import upload from "../middlewares/multer";
const router = express.Router();

router.route("/").put(isAuthenticated, upload.single("imageFile"), addMenu);
router.route("/:id").put(isAuthenticated, upload.single("imageFile"), editMenu);

export default router;
