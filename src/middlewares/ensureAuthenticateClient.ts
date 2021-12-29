import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({
            message: "Token missing!"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "973220b32ccbd5404baa0b0b7ee74f33") as IPayload;

        request.id_client = sub;

        return next();
    } catch(err) {
        return response.status(401).json({
            message: "Invalid token!"
        });
    }
}