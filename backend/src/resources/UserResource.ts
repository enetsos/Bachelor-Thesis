import BaseResource from "./BaseResource";

class UserResource extends BaseResource<UserAttributes, UserEntity>() {
    item() {
        const userResource: UserEntity = {
            id: this.instance.id,
            name: this.instance.name,
            email: this.instance.email,
            role: this.instance.role,
        };

        return userResource;
    }
}

export default UserResource;