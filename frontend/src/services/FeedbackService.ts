import ApiService from "./ApiService";
import { FeedbackAttributes } from "../types";

const FeedbackService = {
    async createFeedback(data: Partial<FeedbackAttributes>): Promise<FeedbackAttributes> {
        try {
            const response = await ApiService.post("/feedback/new-feedback", data);
            return response.data as FeedbackAttributes;
        } catch (error) {
            console.error("Error creating feedback:", error);
            throw error;
        }
    },

    async getAllFeedbacks(): Promise<FeedbackAttributes[]> {
        try {
            const response = await ApiService.get("/feedback/get-all-feedbacks");
            return response.data as FeedbackAttributes[];
        } catch (error) {
            console.error("Error fetching all feedbacks:", error);
            throw error;
        }
    },

    async getFeedbackByClientId(clientId: string): Promise<FeedbackAttributes[]> {
        try {
            const response = await ApiService.get(`/feedback/get-by-client-id/${clientId}`);
            return response.data as FeedbackAttributes[];
        } catch (error) {
            console.error("Error fetching feedback by client id:", error);
            throw error;
        }
    },


};

export default FeedbackService;