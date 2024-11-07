import { Router } from "@oak/oak";

import { registerUser } from "./controllers/userController.ts";
import { validateUser } from "./validators/userValidator.ts";

const router = new Router();

router.post("/signup", validateUser, registerUser);

export default router;
