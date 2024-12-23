import { Router } from "@oak/oak";

import {
	getUsers,
	loginUser,
	logoutUser,
	refreshUser,
	registerUser,
} from "./controllers/userController.ts";
import { validateUser } from "./validators/userValidator.ts";
import { authHandler } from "./middleware/authHandler.ts";
import { wsConnectionHandler } from "./controllers/wsController.ts";

const router = new Router();

router.get("/ws", wsConnectionHandler);
router.post("/signup", validateUser, registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshUser);
router.get("/users", authHandler, getUsers);

export default router;
