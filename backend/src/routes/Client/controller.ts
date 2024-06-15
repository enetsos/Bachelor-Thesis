import { NextFunction, Request, Response } from "express";
import ClientResource from "../../resources/ClientResource";
import ClientRepository from "../../repositories/ClientRepository";

export const listClients = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new ClientRepository();
        const Clients = ClientResource.collection(
            await repository.getAll({
                sortBy: req.query.sort_by,
            })
        );
        res.status(200).json(Clients);
    } catch (error: any) {
        next(error);
    }
};

export const getClient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new ClientRepository();
        const clientResource = new ClientResource(
            await repository.getById(req.params.id)
        );
        res.status(200).json({ Client: clientResource.item() });
    } catch (error: any) {
        next(error);
    }
};

export const createClient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new ClientRepository();
        const clientResource = new ClientResource(
            await repository.create(req.body)
        );
        res.status(201).json({ Client: clientResource.item() });
    } catch (error) {
        next(error);
    }
};

export const updateClient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new ClientRepository();
        const clientResource = new ClientResource(
            await repository.update(req.params.id, req.body)
        );
        res.status(200).json({ Client: clientResource.item() });
    } catch (error) {
        next(error);
    }
};

export const deleteClient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const repository = new ClientRepository();
        await repository.delete(req.params.id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};