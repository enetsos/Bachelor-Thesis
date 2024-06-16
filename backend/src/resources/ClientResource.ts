import BaseResource from "./BaseResource";

class ClientResource extends BaseResource<ClientAttributes, ClientEntity>() {
    item() {
        const clientResource: ClientEntity = {
            id: this.instance.id,
            name: this.instance.name,
            email: this.instance.email,
        };

        return clientResource;
    }
}

export default ClientResource;