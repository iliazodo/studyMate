import express from "express";

import { getAll , blockUser , sendMessage , editMessage ,deleteMessage , followUser } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/getAll" , getAll);
router.post("/blockUser/:userId" , protectRoute , blockUser);
router.post("/message/send/:userId" , protectRoute, sendMessage);
router.put("/message/edit/:messageId" , protectRoute , editMessage);
router.delete("/message/delete/:messageId" , protectRoute, deleteMessage);
router.post("/follow/:userId" , protectRoute, followUser);

export default router;
