import { Request, Response } from "express";

import { findAllAvailableUseCase } from "./FindAllAvailableUseCase";

export class FindAllAvailableController {
    async handle(request: Request, response: Response): Promise<Response> {
        const findAllWithoutEndDateUseCase = new findAllAvailableUseCase();

        const deliveries = await findAllWithoutEndDateUseCase.execute();

        return response.json(deliveries);
    }
}