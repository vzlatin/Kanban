import { Router } from "@oak/oak";

import { registerUser } from "./controller.ts";

const loginRouter = new Router();

loginRouter.post("/signup", registerUser);

export default loginRouter;
