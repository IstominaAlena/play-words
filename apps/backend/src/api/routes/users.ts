import { Router } from "express";

import { controllerWrapper } from "@/middlewares/controller-wrapper";

import { UsersControllersService } from "../controllers/users/users-controllers-service";

const router = Router();

router.use("/:id", controllerWrapper(UsersControllersService.getUserById));
router.use("/", controllerWrapper(UsersControllersService.getAllUsers));

export default router;
