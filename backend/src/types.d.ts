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

type ClientEntity = {
    id: string;
    name: string;
    email: string;
    pw: string;
};


interface ClientAttributes {
    id: string;
    name: string;
    email: string;
    pw: string;
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
