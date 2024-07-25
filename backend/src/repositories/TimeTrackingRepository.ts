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

    getAll(options: Record<string, any> = {}): Promise<Array<TimeTrackingAttributes>> {
        const opts = {
            ...options,
        };
        return super.getAll(opts);
    }

    findByClientId(clientId: string): Promise<Array<TimeTrackingAttributes>> {
        const opts = {
            where: { clientId },
        };
        return this.modelClass.findAll(opts);
    }

    findByEmployeeId(employeeId: string): Promise<Array<TimeTrackingAttributes>> {
        const opts = {
            where: { employeeId },
        };
        return this.modelClass.findAll(opts);
    }

}
