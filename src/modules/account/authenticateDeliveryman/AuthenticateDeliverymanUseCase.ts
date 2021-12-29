import { compare } from "bcryptjs";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman): Promise<string> {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        });

        if(!deliveryman) {
            throw new Error("Username or password invalid!");
        }

        const passwordMatch = await compare(password, deliveryman.password);

        if(!passwordMatch) {
            throw new Error("Username or password invalid!");
        }

        const token = sign({username}, "973220b32ccbd5477baa0b0b7ee74f33", {
            subject: deliveryman.id,
            expiresIn: "1d"
        });

        return token;
    }
}