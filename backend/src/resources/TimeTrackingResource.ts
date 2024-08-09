import BaseResource from "./BaseResource";
import UserResource from "./UserResource"; // Supponiamo di avere un resource per User
import SupplyResource from "./SupplyResource"; // Supponiamo di avere un resource per Supply

class TimeTrackingResource extends BaseResource<TimeTrackingAttributes, TimeTrackingEntity>() {
    item() {
        const timeTrackingResource: TimeTrackingEntity = {
            id: this.instance.id,
            employeeId: this.instance.employeeId,
            clientId: this.instance.clientId,
            startTime: this.instance.startTime,
            endTime: this.instance.endTime,
            status: this.instance.status,
            longStartTime: this.instance.longStartTime,
            longEndTime: this.instance.longEndTime,
            latStartTime: this.instance.latStartTime,
            latEndTime: this.instance.latEndTime,
            notes: this.instance.notes,
            client: this.instance.client ? new UserResource(this.instance.client).item() : null,
            employee: this.instance.employee ? new UserResource(this.instance.employee).item() : null,
            supplies: this.instance.supplies ? SupplyResource.collection(this.instance.supplies) : []
        };

        return timeTrackingResource;
    }
}

export default TimeTrackingResource;
