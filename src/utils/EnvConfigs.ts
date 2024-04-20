import env from "env-var";

export const PORT: number = env.get('PORT').required().asIntPositive();
export const JWT_SECRET: string = env.get('JWT_SECRET').required().asString();
export const BCRYPT_SALT: number = env.get('BCRYPT_SALT').required().asIntPositive();
