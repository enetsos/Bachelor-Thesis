import { NextFunction, Request, Response } from "express";
import UserResource from "../../resources/UserResource";
import UserRepository from "../../repositories/UserRepository";

export const listUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new UserRepository();
        const Users = UserResource.collection(
            await repository.getAll({
                sortBy: req.query.sort_by,
            })
        );
        res.status(200).json(Users);
    } catch (error: any) {
        next(error);
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new UserRepository();
        const userResource = new UserResource(
            await repository.getById(req.params.id)
        );
        res.status(200).json({ User: userResource.item() });
    } catch (error: any) {
        next(error);
    }
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new UserRepository();
        const userResource = new UserResource(
            await repository.create(req.body)
        );
        res.status(201).json(userResource.item());
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new UserRepository();
        const userResource = new UserResource(
            await repository.update(req.params.id, req.body)
        );
        res.status(200).json({ User: userResource.item() });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new UserRepository();
        await repository.delete(req.params.id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};