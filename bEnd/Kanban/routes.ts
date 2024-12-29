import { Router } from "@oak/oak";

import {
	getUsers,
	loginUser,
	logoutUser,
	refreshUser,
	registerUser,
} from "./https/controllers/userController.ts";
import { validateUser } from "./https/validators/userValidator.ts";
import { authHandler } from "./https/middleware/authHandler.ts";
import websocketHandler from "./websockets/controllers/broadcasterController.ts";

const router = new Router();
router.post("/signup", validateUser, registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshUser);
router.get("/users", authHandler, getUsers);
router.get("/ws", websocketHandler.handleSocket);

export default router;
