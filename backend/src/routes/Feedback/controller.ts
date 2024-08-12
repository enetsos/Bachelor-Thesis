import { Request, Response, NextFunction } from "express";
import FeedbackRepository from "../../repositories/FeedbackRepository";
import FeedbackResource from "../../resources/FeedbackResource";
import { get } from "http";


export const createFeedback = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const repository = new FeedbackRepository();
        const feedbackResource = new FeedbackResource(
            await repository.create(req.body)
        )
        res.status(201).json(feedbackResource.item());
    } catch (error) {
        next(error);
    }
}

export const getAllFeedbacks = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const repository = new FeedbackRepository();
        const feedbacks = FeedbackResource.collection(
            await repository.getAll({
                sortBy: req.query.sort_by,
            })
        );
        res.status(201).json(feedbacks);
    } catch (error) {
        next(error);
    }
}

export const getFeedbackByClientId = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const repository = new FeedbackRepository();
        const feedbacks = FeedbackResource.collection(
            await repository.getByClientId(req.params.clientId)
        );
        res.status(201).json(feedbacks);
    } catch (error) {
        next(error);
    }
}
