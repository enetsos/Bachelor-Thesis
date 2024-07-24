import BaseRepository from "./BaseRepository";
import TimeTracking from "../db/models/timeTracking";

export default class TimeTrackingRepository extends BaseRepository<TimeTrackingAttributes> {
    protected allowedSortByFields = [
        "startTime",
        "endTime",
        "created_at",
        "updated_at",
    ];

    protected allowedFilterByFields = ["employeeId", "clientId", "status"];

    constructor() {
        super(TimeTracking);
    }

    getAll(options: Record<string, any> = {}) {
        const opts = {
            ...options,
            include: ["employee", "client"]
        };
        return super.getAll(opts);
    }

    getById(id: string, options: Record<string, any> = {}) {
        const opts = {
            ...options,
            include: ["employee", "client"]
        };
        return super.getById(id, opts);
    }
}
