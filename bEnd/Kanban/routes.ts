import { Router } from "@oak/oak";

import {
  getUsers,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from "./src/https/controllers/user.controller.ts";
import {
  getEntityCollection,
} from "./src/https/controllers/data.controller.ts";
import { validateUser } from "./src/https/validators/userValidator.ts";
import { authHandler } from "./src/https/middleware/authHandler.ts";
import websocketHandler from "./src/websockets/controllers/broadcasterController.ts";
import { FileUploader } from "./src/https/middleware/fileUploadHandler.ts";

const router = new Router();

// TODO: to add auth handlers !

// Auth routes
router.post("/signup", validateUser, registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshUser);

// Data retrieval routes
router.get("/entity-collection", authHandler, getEntityCollection);
router.get("/users", authHandler, getUsers);

// File upload
const fileUploadHandler = new FileUploader("uploads").handler();
router.post("/profile_pic", fileUploadHandler);

// Web Sockets
router.get("/ws", websocketHandler.handleSocket);

export default router;
