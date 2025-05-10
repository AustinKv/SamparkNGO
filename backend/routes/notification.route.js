import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
	deleteNotification,
	getUserNotifications,
	markNotificationAsRead,
	sendSOSNotification
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserNotifications);
router.put("/:id/read", protectRoute, markNotificationAsRead);
router.delete("/:id", protectRoute, deleteNotification);
router.post("/sos", protectRoute, sendSOSNotification);

export default router;
