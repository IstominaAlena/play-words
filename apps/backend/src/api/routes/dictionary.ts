import { Router } from "express";

import { createWordSchema } from "@repo/common/schemas/dictionary";

import { authValidation } from "@/middlewares/auth-validation";
import { validateBody } from "@/middlewares/body-validation";
import { controllerWrapper } from "@/middlewares/controller-wrapper";

import { dictionaryControllersService } from "../controllers/dictionary/service";

const router = Router();

router.get("/", authValidation, controllerWrapper(dictionaryControllersService.getDictionary));

router.post(
    "/add",
    authValidation,
    validateBody(createWordSchema),
    controllerWrapper(dictionaryControllersService.addWord),
);

router.delete(
    "/delete",
    authValidation,
    controllerWrapper(dictionaryControllersService.deleteWord),
);

export default router;
