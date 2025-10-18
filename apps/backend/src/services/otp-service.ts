import speakeasy from "speakeasy";

export class OtpService {
    async generateSecret(email: string | number) {
        return speakeasy.generateSecret({
            name: `PlayWords:${email}`,
            length: 32,
        });
    }

    async verifyOtp(secret: string, token: string) {
        return speakeasy.totp.verify({
            secret,
            encoding: "base32",
            token,
        });
    }
}

export const otpService = new OtpService();
