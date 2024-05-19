import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "../../../utils/EnvConfigs";
export function CriptoPassword(payload) {
    const that = structuredClone(payload);
    const salt = bcrypt.genSaltSync(BCRYPT_SALT);
    const hash = bcrypt.hashSync(that["senha"], salt);
    const transformed = { ...that, senha: hash };
    return transformed;
}
//# sourceMappingURL=CriptoPassword.js.map