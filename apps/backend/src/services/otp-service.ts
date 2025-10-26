import speakeasy from "speakeasy";

export class OtpService {
    async generateSecret(email: string | number) {
        return speakeasy.generateSecret({
            name: `PlayWords:${email}`,
            issuer: "PlayWords",
            length: 20,
        });
    }

    async verifyOtp(secret: string, token: string) {
        return speakeasy.totp.verify({
            secret,
            encoding: "base32",
            token,
        });
    }

    generateOtpAuthUrl(email: string, base32: string) {
        const label = encodeURIComponent(`PlayWords:${email}`);

        return `otpauth://totp/${label}?secret=${base32}`;
    }
}

export const otpService = new OtpService();
