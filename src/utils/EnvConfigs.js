import env from "env-var";
export const PORT = env.get('PORT').required().asIntPositive();
export const JWT_SECRET = env.get('JWT_SECRET').required().asString();
export const BCRYPT_SALT = env.get('BCRYPT_SALT').required().asIntPositive();
//# sourceMappingURL=EnvConfigs.js.map