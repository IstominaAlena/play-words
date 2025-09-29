import { Router } from "express";

import { controllerWrapper } from "@/middlewares/controller-wrapper";

import { usersControllersService } from "../controllers/users/users-controllers-service";

const router = Router();

router.use("/:id", controllerWrapper(usersControllersService.getUserById));
router.use("/", controllerWrapper(usersControllersService.getAllUsers));

export default router;
