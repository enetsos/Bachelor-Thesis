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

// src/types.ts

export interface TimeTrackingAttributes {
    id: string;
    employeeId: string;       // ID del dipendente che sta effettuando la timbratura
    clientId: string;       // ID del cliente presso cui viene effettuata la timbratura
    startTime: Date;        // Ora di inizio della timbratura (ISO 8601 string)
    endTime?: Date;         // Ora di fine della timbratura (opzionale, ISO 8601 string)
    status: 'active' | 'inactive' | 'concluded'; // Stato della timbratura
}

export interface SupplyAttributes {
    id: string;
    name: string;
    price: number;
}

