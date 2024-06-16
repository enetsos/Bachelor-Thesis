import BaseResource from "./BaseResource";

class EmployeeResource extends BaseResource<EmployeeAttributes, EmployeeEntity>() {
    item() {
        const employeeResource: EmployeeEntity = {
            id: this.instance.id,
            name: this.instance.name,
            email: this.instance.email,
            role: this.instance.role,
        };

        return employeeResource;
    }
}

export default EmployeeResource;