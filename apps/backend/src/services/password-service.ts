import argon2 from "argon2";

export class PasswordService {
    async hashPassword(password: string) {
        return argon2.hash(password, { type: argon2.argon2id });
    }

    async comparePassword(password: string, hash: string) {
        return argon2.verify(hash, password);
    }
}

export const passwordService = new PasswordService();
