import env from "env-var";
export const CUSTOMER_SERVER_PORT = env
    .get("CUSTOMER_SERVER_PORT")
    .required()
    .asIntPositive();
export const FARMER_SERVER_PORT = env
    .get("FARMER_SERVER_PORT")
    .required()
    .asIntPositive();
export const SET_SERVER_PORT = env
    .get("SET_SERVER_PORT")
    .required()
    .asIntPositive();
export const HTTP_SERVER_PORT = env
    .get("HTTP_SERVER_PORT")
    .required()
    .asIntPositive();
export const JWT_SECRET = env.get('JWT_SECRET').required().asString();
export const BCRYPT_SALT = env.get('BCRYPT_SALT').required().asIntPositive();
//# sourceMappingURL=EnvConfigs.js.map