import { Request, Response, NextFunction } from "express";
import TimeTrackingRepository from "../../repositories/TimeTrackingRepository";

export const createTimeTracking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { employeeId, clientId, startTime, status } = req.body;

        const repository = new TimeTrackingRepository();
        const newTimeTracking = await repository.create({
            employeeId,
            clientId,
            startTime,
            status,
        } as TimeTrackingAttributes);

        res.status(201).json(newTimeTracking);
    } catch (error: any) {
        next(error);
    }
};

export const getTimeTrackingByclient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clientId } = req.params;

        const repository = new TimeTrackingRepository();
        const timeTrackings = await repository.getAll({
            where: { clientId }
        });

        res.status(200).json(timeTrackings);
    } catch (error: any) {
        next(error);
    }
};
