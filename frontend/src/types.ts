export enum Role {
    ADMIN = "admin",
    SUPERVISOR = "supervisor",
    EMPLOYEE = "employee",
    CLIENT = "client",
}

export interface User {
    id: string;
    name: string;
    email: string;
    pw: string;
    role: Role | string;
    created_at: Date;
    updated_at: Date;
}
