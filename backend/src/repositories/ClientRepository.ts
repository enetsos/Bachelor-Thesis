import Client from "../db/models/client";
import BaseRepository from "./BaseRepository";

export default class ClientRepository extends BaseRepository<ClientAttributes> {
    protected allowedSortByFields = [
        "name",
        "created_at",
        "updated_at",
    ];

    protected allowedFilterByFields = ["name"];

    constructor() {
        super(Client);
    }

    getAll(options: Record<string, any> = {}) {
        const opts = {
            ...options,
        };
        return super.getAll(opts);
    }

    getById(id: string, options: Record<string, any> = {}) {
        const opts = {
            ...options,

        };
        return super.getById(id, opts);
    }


}