import argon2 from "argon2";

export class HashService {
    async hash(value: string) {
        return argon2.hash(value, { type: argon2.argon2id });
    }

    async compareHash(value: string, hash: string) {
        return argon2.verify(hash, value);
    }
}

export const hashService = new HashService();
