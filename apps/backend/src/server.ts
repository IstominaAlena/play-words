import express from "express";
import { db } from "./db"; // your drizzle db instance
import { usersTable } from "./schema";
import { eq } from "drizzle-orm";

const app = express();
app.use(express.json());

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
  try {
    const { id } = req.params;
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(id)));
    if (user.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
