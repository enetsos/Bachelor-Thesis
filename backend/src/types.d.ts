type ErrorName =
    | "NOT_FOUND_ERROR"
    | "CONNECTION_ERROR"
    | "METHOD_NOT_IMPLEMENTED";
type ErrorCode = "ERR_NF" | "ERR_REMOTE" | "NOT_IMPL" | "ERR_VALID";

type ValidationError = {
    error: {
        message: string;
        code: ErrorCode;
        errors: Array<{ message: string }>;
    };
};

type UserEntity = {
    id: string;
    name: string;
    email: string;
    role: Role;
};

enum Role {
    ADMIN = "admin",
    SUPERVISOR = "supervisor",
    EMPLOYEE = "employee",
    CLIENT = "client",
}

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    pw: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
}

type EmployeeEntity = {
    id: string;
    name: string;
    email: string;
    role: string;
};

interface EmployeeAttributes {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}
