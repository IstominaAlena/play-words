import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import express from "express";

import { db } from "./db";
import { i18nMiddleware } from "./i18n/middleware";
import { usersTable } from "./schema";

dotenv.config();

const app = express();
app.use(express.json());
app.use(i18nMiddleware);

// ✅ GET all users
app.get("/users", async (req, res) => {
    try {
        const allUsers = await db.select().from(usersTable);
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// ✅ (Optional) GET one user by id
app.get("/users/:id", async (req, res) => {
    const messages = req.messages;

    try {
        const { id } = req.params;
        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, Number(id)));
        if (user.length === 0) return res.status(404).json({ error: messages.USER_NOT_FOUND });
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
