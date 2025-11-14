import { Router } from "express";

import { authValidation } from "@/middlewares/auth-validation";
import { controllerWrapper } from "@/middlewares/controller-wrapper";

import { practiceControllersService } from "../controllers/practice/service";

const router = Router();

router.post("/", authValidation, controllerWrapper(practiceControllersService.getWords));

export default router;
