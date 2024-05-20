import { DatabaseConnectionGET } from "../../model/databaseConnection";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/EnvConfigs";

type payloadType = {
    email: string
}
declare const datas: payloadType;
const database = new DatabaseConnectionGET();

export async function fromTokenGetUserId(token: string): Promise<string | undefined | null> {
    const payload = jwt.verify(token, JWT_SECRET);
    eval('const datas='+payload);

    if(!datas) {
        console.log("Erro ao decodificar o payload");
        return null;
    }
    
    if(!("email" in datas)) {
        console.log("Não há o campo [email] no payload");
        return null;
    }
    
    const { userid } = await database.fromDatabaseGetUser(datas['email']);
    return userid;
}