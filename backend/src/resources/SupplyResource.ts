import BaseResource from "./BaseResource";

class SupplyResource extends BaseResource<SupplyAttributes, SupplyEntity>() {
    item() {
        const supplyResource: SupplyEntity = {
            id: this.instance.id,
            name: this.instance.name,
        };

        return supplyResource;
    }
}

export default SupplyResource;
