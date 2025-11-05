import { Router } from "express";

import { createWordSchema, editWordSchema } from "@repo/common/schemas/dictionary";

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

router.patch(
    "/edit",
    authValidation,
    validateBody(editWordSchema),
    controllerWrapper(dictionaryControllersService.editWord),
);

router.delete(
    "/delete",
    authValidation,
    controllerWrapper(dictionaryControllersService.deleteWord),
);

router.post("/word", authValidation, controllerWrapper(dictionaryControllersService.getWordInfo));

// Demo-dictionary

router.get("/demo", controllerWrapper(dictionaryControllersService.getDemoDictionary));

router.post(
    "/add-demo",
    validateBody(createWordSchema),
    controllerWrapper(dictionaryControllersService.addDemoWord),
);

router.delete("/delete-demo", controllerWrapper(dictionaryControllersService.deleteDemoWord));

export default router;
