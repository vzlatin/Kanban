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
  getProfilePic,
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
// TODO: Add saving the fileUploadHandler results to the database
// and return a response. The results are currently in the request's context.
const fileUploadHandler = new FileUploader("profile-picture-uploads").handler();
router.post("/profile-pic", authHandler, fileUploadHandler);
router.get("/profile-pic/:path+", authHandler, getProfilePic);

// Web Sockets
router.get("/ws", websocketHandler.handleSocket);

export default router;
