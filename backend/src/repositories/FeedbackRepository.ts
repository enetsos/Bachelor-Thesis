import BaseRepository from "./BaseRepository";
import Feedback from "../db/models/feedback";

export default class FeedbackRepository extends BaseRepository<FeedbackAttributes> {
    constructor() {
        super(Feedback);
    }

    async getByClientId(clientId: string): Promise<FeedbackAttributes[]> {
        return this.modelClass.findAll({
            where: {
                clientId,
            },
        });
    }
}