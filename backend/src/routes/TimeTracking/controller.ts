import { Request, Response, NextFunction } from "express";
import TimeTrackingRepository from "../../repositories/TimeTrackingRepository";
import TimeTrackingResource from "../../resources/TimeTrackingResource";

export const createTimeTracking = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const repository = new TimeTrackingRepository();
        const timeTrackingResource = new TimeTrackingResource(
            await repository.create(req.body)
        )
        res.status(201).json(timeTrackingResource.item());
    } catch (error) {
        next(error);
    }
};

export const getAllTimeTrackings = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const repository = new TimeTrackingRepository();
        const timeTrackings = TimeTrackingResource.collection(
            await repository.getAll({
                sortBy: req.query.sort_by,
            })
        );
        res.status(201).json(timeTrackings);
    } catch (error) {
        next(error);
    }
};

export const getTimeTrackingByClientId = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const repository = new TimeTrackingRepository();
        const timeTrackings = await repository.findByClientId(req.params.clientId);
        const timeTrackingResource = TimeTrackingResource.collection(timeTrackings);
        res.status(201).json(timeTrackingResource);
    } catch (error) {
        next(error);
    }
};

export const getTimeTrackingByEmployeeId = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const repository = new TimeTrackingRepository();
        const timeTrackings = await repository.findByEmployeeId(req.params.employeeId);
        const timeTrackingResource = TimeTrackingResource.collection(timeTrackings);
        res.status(201).json(timeTrackingResource);
    } catch (error) {
        next(error);
    }
};
