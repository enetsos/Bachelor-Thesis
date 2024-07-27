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

    async stopTimer(id: string, body: Record<string, any>): Promise<TimeTrackingAttributes | null> {
        try {
            const timeTracking = await this.modelClass.findByPk(id);
            if (!timeTracking) {
                throw new Error(`Time tracking entry with id ${id} not found`);
            }
            timeTracking.endTime = body.endTime;
            timeTracking.status = 'completed';
            await timeTracking.save();
            return timeTracking;
        } catch (error) {
            console.error(`Error stopping timer for id ${id}:`, error);
            throw error;
        }
    }


}
