import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
    sharedSecret: process.env.SHARED_SECRET,
    // jwtSecret: process.env.JWT_SECRET,
    // jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}));
