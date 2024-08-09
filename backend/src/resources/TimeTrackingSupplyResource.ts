export default class TimeTrackingSupplyResource {
    private timeTrackingSupply: TimeTrackingSupplyAttributes;

    constructor(timeTrackingSupply: TimeTrackingSupplyAttributes) {
        this.timeTrackingSupply = timeTrackingSupply;
    }

    item() {
        return {
            timeTrackingId: this.timeTrackingSupply.timeTrackingId,
            supplyId: this.timeTrackingSupply.supplyId,
        };
    }

    static collection(timeTrackingSupplies: Array<TimeTrackingSupplyAttributes>) {
        return timeTrackingSupplies.map(timeTrackingSupply => new TimeTrackingSupplyResource(timeTrackingSupply).item());
    }
}
