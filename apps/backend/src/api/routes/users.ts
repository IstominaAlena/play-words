import { Router } from "express";

import { controllerWrapper } from "@/middlewares/controller-wrapper";

import { usersControllersService } from "../controllers/users/users-controllers-service";

const router = Router();

router.get("/:id", controllerWrapper(usersControllersService.getUserById));
router.get("/", controllerWrapper(usersControllersService.getAllUsers));

export default router;
