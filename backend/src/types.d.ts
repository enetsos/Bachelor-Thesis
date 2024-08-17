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
    clientLAT?: number | null;
    clientLONG?: number | null;
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
    clientLAT?: number | null;
    clientLONG?: number | null;
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

interface TimeTrackingAttributes {
    id: string;
    employeeId: string;
    clientId: string;
    startTime: Date;
    endTime?: Date;
    status: TimeTrackingStatus;
    longStartTime: number;
    longEndTime: number;
    latStartTime: number;
    latEndTime: number;
    notes: string;
    client: UserAttributes | null;
    employee: UserAttributes | null;
    supplies: SupplyAttributes[];
}

type TimeTrackingEntity = {
    id: string;
    employeeId: string;
    clientId: string;
    startTime: Date;
    endTime?: Date;
    status: TimeTrackingStatus;
    longStartTime: number;
    longEndTime: number;
    latStartTime: number;
    latEndTime: number;
    notes: string;
    client: UserEntity | null;
    employee: UserEntity | null;
    supplies: SupplyEntity[] | undefined;
};

enum TimeTrackingStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    COMPLETED = "completed",
}

interface SupplyAttributes {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

type SupplyEntity = {
    id: string;
    name: string;
};

interface TimeTrackingSupplyAttributes {
    timeTrackingId: string;
    supplyId: string;
}

type TimeTrackingSupplyEntity = {
    timeTrackingId: string;
    supplyId: string;
};

interface FeedbackAttributes {
    id: string;
    clientId: string;
    notes: string;
    client: UserAttributes | null;
    created_at: Date;
    updated_at: Date;
}

type FeedbackEntity = {
    id: string;
    clientId: string;
    notes: string;
    client: UserEntity | null;
};