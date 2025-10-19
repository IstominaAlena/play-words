import cron from "node-cron";

import { usersService } from "@/db/services/users/users-service";

cron.schedule("0 0 * * *", async () => {
    const nowISO = new Date().toISOString();

    const usersToDelete = await usersService.getUsersToHardDelete(nowISO);

    for (const user of usersToDelete) {
        await usersService.hardDeleteUserById(user.id);
        console.log(`Hard deleted user ${user.id}`);
    }
});
