import { Router } from "express";
import { spellCheck } from "../controller/spellController";
import { authMiddleware } from "../middlewares/auth";



const router = Router()

router.use(authMiddleware)

router.post("/spell-check", spellCheck);

export default router;