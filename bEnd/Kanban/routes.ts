import { Router } from "@oak/oak";

import { registerUser } from "./controllers/userController.ts";

const router = new Router();

router.post("/signup", registerUser);

export default router;
