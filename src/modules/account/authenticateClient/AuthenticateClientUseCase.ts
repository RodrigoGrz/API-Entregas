import { compare } from "bcryptjs";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient): Promise<string> {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        });

        if(!client) {
            throw new Error("Username or password invalid!");
        }

        const passwordMatch = await compare(password, client.password);

        if(!passwordMatch) {
            throw new Error("Username or password invalid!");
        }

        const token = sign({username}, "973220b32ccbd5404baa0b0b7ee74f33", {
            subject: client.id,
            expiresIn: "1d"
        });

        return token;
    }
}