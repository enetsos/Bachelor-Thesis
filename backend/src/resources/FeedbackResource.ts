import BaseResource from "./BaseResource";

class FeedbackResource extends BaseResource<FeedbackAttributes, FeedbackEntity>() {
    item() {
        const feedbackResource: FeedbackEntity = {
            id: this.instance.id,
            clientId: this.instance.clientId,
            notes: this.instance.notes,
        };

        return feedbackResource;
    }
}

export default FeedbackResource;
