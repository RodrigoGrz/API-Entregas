import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcryptjs";
import { Clients } from "@prisma/client";

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ username, password }: ICreateClient): Promise<Clients> {
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });

        if(clientExist) {
            throw new Error("Client already exists!");
        }

        const hashPassword = await hash(password, 10);

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        });

        return client;
    }
}