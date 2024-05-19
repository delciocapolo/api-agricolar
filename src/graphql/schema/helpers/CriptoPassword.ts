import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "../../../utils/EnvConfigs";

type WithSenhaType<T> = T & { senha: string };

export function CriptoPassword<T extends object>(payload: WithSenhaType<T>) {
  const that = structuredClone(payload);
  const salt = bcrypt.genSaltSync(BCRYPT_SALT);
  const hash = bcrypt.hashSync(that["senha"], salt);
  const transformed = { ...that, senha: hash };
  return transformed;
}
