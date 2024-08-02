import { Request, Response, NextFunction } from "express";
import SupplyRepository from "../../repositories/SupplyRepository";
import SupplyResource from "../../resources/SupplyResource";

export const createSupply = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const repository = new SupplyRepository();
        const supplyResource = new SupplyResource(
            await repository.create(req.body)
        )
        res.status(201).json(supplyResource.item());
    } catch (error) {
        next(error);
    }
}

export const getAllSupplies = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const repository = new SupplyRepository();
        const supplies = SupplyResource.collection(
            await repository.getAll({
                sortBy: req.query.sort_by,
            })
        );
        res.status(201).json(supplies);
    } catch (error) {
        next(error);
    }
}
