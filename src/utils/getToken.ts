import {Request, Response} from "express";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./EnvConfigs";

export function generateToken(req: Request, res: Response) {
    const {email, role} = req['body'];

    const payload = {
        username: email.split('@')[0],
        email,
        role
    };

    const token = JWT.sign(payload, JWT_SECRET, {
        // o 2 representa o numero de horas
        expiresIn: Math.pow(60, 2) * 5
    });

    res.setHeader('Authorization', `Bearer ${token}`);
    return token;
}

export function getToken() {}