import BaseResource from "./BaseResource";
import UserResource from "./UserResource"; // Supponiamo di avere un resource per User

class FeedbackResource extends BaseResource<FeedbackAttributes, FeedbackEntity>() {
    item() {
        const feedbackResource: FeedbackEntity = {
            id: this.instance.id,
            clientId: this.instance.clientId,
            notes: this.instance.notes,
            client: this.instance.client ? new UserResource(this.instance.client).item() : null,
        };

        return feedbackResource;
    }
}

export default FeedbackResource;
