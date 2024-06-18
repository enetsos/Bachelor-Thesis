import BaseResource from "./BaseResource";

class ClientResource extends BaseResource<ClientAttributes, ClientEntity>() {
    item() {
        const clientResource: ClientEntity = {
            id: this.instance.id,
            name: this.instance.name,
            email: this.instance.email,
            pw: this.instance.pw,
        };

        return clientResource;
    }
}

export default ClientResource;