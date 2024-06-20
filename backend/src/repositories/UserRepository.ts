import User from "../db/models/user";
import BaseRepository from "./BaseRepository";
import bcrypt from "bcryptjs";

export default class UserRepository extends BaseRepository<UserAttributes> {
    protected allowedSortByFields = [
        "name",
        "created_at",
        "updated_at",
    ];

    protected allowedFilterByFields = ["name"];

    constructor() {
        super(User);
    }

    async create(body: Record<string, any>): Promise<UserAttributes> {
        const hashedPw = await bcrypt.hash(body.pw, 12);
        return super.create({ ...body, pw: hashedPw });
    }

    async findByEmail(email: string): Promise<UserAttributes | null> {
        return User.findOne({ where: { email } });
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