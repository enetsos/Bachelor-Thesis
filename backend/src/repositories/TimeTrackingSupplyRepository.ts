import BaseRepository from "./BaseRepository";
import TimeTrackingSupply from "../db/models/timeTrackingSupply";

export default class TimeTrackingSupplyRepository extends BaseRepository<TimeTrackingSupplyAttributes> {
    protected allowedSortByFields = ["createdAt", "updatedAt"];
    protected allowedFilterByFields = ["timeTrackingId", "supplyId"];

    constructor() {
        super(TimeTrackingSupply);
    }

    getAll(options: Record<string, any> = {}): Promise<Array<TimeTrackingSupplyAttributes>> {
        const opts = {
            ...options,
        };
        return super.getAll(opts);
    }

    findByTimeTrackingId(timeTrackingId: string): Promise<Array<TimeTrackingSupplyAttributes>> {
        const opts = {
            where: { timeTrackingId },
        };
        return this.modelClass.findAll(opts);
    }

    findBySupplyId(supplyId: string): Promise<Array<TimeTrackingSupplyAttributes>> {
        const opts = {
            where: { supplyId },
        };
        return this.modelClass.findAll(opts);
    }
}
