import env from "env-var";

export const CUSTOMER_SERVER_PORT: number = env
  .get("CUSTOMER_SERVER_PORT")
  .required()
  .asIntPositive();
export const FARMER_SERVER_PORT: number = env
  .get("FARMER_SERVER_PORT")
  .required()
  .asIntPositive();
export const SET_SERVER_PORT: number = env
  .get("SET_SERVER_PORT")
  .required()
  .asIntPositive();
export const HTTP_SERVER_PORT: number = env
  .get("HTTP_SERVER_PORT")
  .required()
  .asIntPositive();
export const JWT_SECRET: string = env.get('JWT_SECRET').required().asString();
export const BCRYPT_SALT: number = env.get('BCRYPT_SALT').required().asIntPositive();
