import Client from "../db/models/client";
import BaseRepository from "./BaseRepository";
import bcrypt from "bcryptjs";

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

    async create(body: Record<string, any>): Promise<ClientAttributes> {
        const hashedPw = await bcrypt.hash(body.pw, 12);
        return super.create({ ...body, pw: hashedPw });
    }

    async findByEmail(email: string): Promise<ClientAttributes | null> {
        return Client.findOne({ where: { email } });
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