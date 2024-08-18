import BaseRepository from "./BaseRepository";
import Feedback from "../db/models/feedback";
import User from "../db/models/user";

export default class FeedbackRepository extends BaseRepository<FeedbackAttributes> {
    constructor() {
        super(Feedback);
    }

    getAll(options: Record<string, any> = {}): Promise<Array<FeedbackAttributes>> {
        const opts = {
            ...options,
            include: [
                { model: User }  // Include il client associato
            ],
        };
        return super.getAll(opts);
    }

    async getByClientId(clientId: string): Promise<FeedbackAttributes[]> {
        const opts = {
            where: { clientId },
            include: [
                { model: User },   // Include il client associato
            ],
        };
        return this.modelClass.findAll(opts);
    }
}