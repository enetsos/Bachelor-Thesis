import { Request, Response, NextFunction } from "express";
import TimeTrackingSupplyRepository from "../../repositories/TimeTrackingSupplyRepository";
import TimeTrackingSupplyResource from "../../resources/TimeTrackingSupplyResource";

export const addSuppliesToTimeTracking = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const timeTrackingId = req.params.timeTrackingId;
        const supplies = req.body;


        const repository = new TimeTrackingSupplyRepository();

        const timeTrackingSupplies = await Promise.all(
            supplies.map((supply: Partial<TimeTrackingSupplyAttributes>) =>
                repository.create({
                    timeTrackingId,
                    supplyId: supply.supplyId,
                })
            )
        );

        res.status(201).json(TimeTrackingSupplyResource.collection(timeTrackingSupplies));
    } catch (error) {
        next(error);
    }
};

export const getSuppliesByTimeTrackingId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new TimeTrackingSupplyRepository();
        const timeTrackingSupplies = await repository.findByTimeTrackingId(req.params.timeTrackingId);
        res.status(200).json(TimeTrackingSupplyResource.collection(timeTrackingSupplies));
    } catch (error) {
        next(error);
    }
};

export const getTimeTrackingsBySupplyId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new TimeTrackingSupplyRepository();
        const timeTrackingSupplies = await repository.findBySupplyId(req.params.supplyId);
        res.status(200).json(TimeTrackingSupplyResource.collection(timeTrackingSupplies));
    } catch (error) {
        next(error);
    }
};
