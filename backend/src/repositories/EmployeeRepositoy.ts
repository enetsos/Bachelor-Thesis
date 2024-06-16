import Employee from "../db/models/employee";
import BaseRepository from "./BaseRepository";

export default class EmployeeRepository extends BaseRepository<EmployeeAttributes> {
    protected allowedSortByFields = [
        "name",
        "created_at",
        "updated_at",
    ];

    protected allowedFilterByFields = ["name"];

    constructor() {
        super(Employee);
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