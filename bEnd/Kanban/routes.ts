import { Router } from "@oak/oak";

import {
    loginUser,
    logoutUser,
    refreshUser,
    registerUser,
} from "./controllers/userController.ts";
import { validateUser } from "./validators/userValidator.ts";

const router = new Router();

router.post("/signup", validateUser, registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUser);

export default router;
