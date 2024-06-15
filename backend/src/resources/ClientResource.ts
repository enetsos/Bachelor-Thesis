import BaseResource from "./BaseResource";

class ClientResource extends BaseResource<ClientAttributes, ClientEntity>() {
    item() {
        const tourResource: ClientEntity = {
            id: this.instance.id,
            name: this.instance.name,
            email: this.instance.email,
        };

        return tourResource;
    }
}

export default ClientResource;