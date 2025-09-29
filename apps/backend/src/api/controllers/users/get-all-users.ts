import { Request, Response } from "express";

import { usersService } from "@/db/services/users-service";

export const getAllUsers = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;

    const users = await usersService.getAllUsers(page, pageSize);
    res.json(users);
};
