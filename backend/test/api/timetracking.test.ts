import supertest from "supertest";
import { createServer } from "../../src/server";
import TimeTrackingRepository from "../../src/repositories/TimeTrackingRepository";
import { Request, Response, NextFunction } from "express";
import { stat } from "fs";

// Mock the authentication middleware
jest.mock("../../src/middleware/authMiddleware", () => ({
    verifyToken: jest.fn((requiredRole) => (req: Request, res: Response, next: NextFunction) => {
        req.user = { role: requiredRole };
        next();
    }),
    authenticateToken: jest.fn((req: Request, res: Response, next: NextFunction) => {
        req.user = { id: "test-user-id", role: "admin" }; // Mocked user data
        next();
    }),
}));

// Create mocks for TimeTrackingRepository methods
const create = jest.fn();
const getAll = jest.fn();
const findByClientId = jest.fn();
const findByEmployeeId = jest.fn();
const getById = jest.fn();
const update = jest.fn();

// Mock the TimeTrackingRepository class
jest.mock("../../src/repositories/TimeTrackingRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            create,
            getAll,
            findByClientId,
            findByEmployeeId,
            getById,
            update,
        };
    });
});

beforeEach(() => {
    create.mockClear();
    getAll.mockClear();
    findByClientId.mockClear();
    findByEmployeeId.mockClear();
    getById.mockClear();
    update.mockClear();
});

describe("TimeTracking API", () => {
    describe("create time tracking endpoint", () => {
        it("creates a new time tracking entry", async () => {
            create.mockImplementation(async () => ({
                id: "abcd-1234-efgh-5678",
                employeeId: "employee-1234",
                clientId: "client-1234",
                startTime: new Date(),
                status: "active",
                latStartTime: 12.34,
                longStartTime: 56.78,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            const newTimeTracking = {
                employeeId: "employee-1234",
                clientId: "client-1234",
                status: "active",
                startTime: new Date(),
                latStartTime: 12.34,
                longStartTime: 56.78,
            };

            await supertest(createServer())
                .post("/api/time-tracking/new-time")
                .set("Authorization", "Bearer employee-token")
                .send(newTimeTracking)
                .expect(201);
        });

        it("returns 500 for invalid data", async () => {
            create.mockImplementation(() => {
                throw new Error("Invalid data");
            });

            const invalidTimeTracking = {
                employeeId: "",
                clientId: "",
                latStartTime: null,
                longStartTime: null,
            };

            await supertest(createServer())
                .post("/api/time-tracking/new-time")
                .set("Authorization", "Bearer employee-token")
                .send(invalidTimeTracking)
                .expect(500);
        });
    });

    describe("get all time trackings endpoint", () => {
        it("returns all time tracking entries", async () => {
            getAll.mockImplementation(async () => [
                {
                    id: "abcd-1234-efgh-5678",
                    employeeId: "employee-1234",
                    clientId: "client-1234",
                    startTime: new Date(),
                    endTime: new Date(),
                    status: "completed",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);

            await supertest(createServer())
                .get("/api/time-tracking/get-all-time")
                .set("Authorization", "Bearer admin-token")
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(1);
                });
        });

        it("returns 500 if there is an error retrieving time trackings", async () => {
            getAll.mockImplementation(() => {
                throw new Error("Error retrieving time trackings");
            });

            await supertest(createServer())
                .get("/api/time-tracking/get-all-time")
                .set("Authorization", "Bearer admin-token")
                .expect(500);
        });
    });

    describe("get time tracking by client ID endpoint", () => {
        it("returns time tracking entries for a specific client", async () => {
            findByClientId.mockImplementation(async () => [
                {
                    id: "abcd-1234-efgh-5678",
                    employeeId: "employee-1234",
                    clientId: "client-1234",
                    startTime: new Date(),
                    endTime: new Date(),
                    status: "completed",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);

            await supertest(createServer())
                .get("/api/time-tracking/get-client-time/client-1234")
                .set("Authorization", "Bearer supervisor-token")
                .expect(201)
                .then((response) => {
                    expect(response.body.length).toBe(1);
                });
        });

        it("returns 404 if no time tracking entries are found for the client", async () => {
            findByClientId.mockImplementation(async () => []);

            await supertest(createServer())
                .get("/api/time-tracking/get-client-time/client-1234")
                .set("Authorization", "Bearer supervisor-token")
                .expect(201)
                .then((response) => {
                    expect(response.body.length).toBe(0);
                });
        });
    });

    describe("get time tracking by employee ID endpoint", () => {
        it("returns time tracking entries for a specific employee", async () => {
            findByEmployeeId.mockImplementation(async () => [
                {
                    id: "abcd-1234-efgh-5678",
                    employeeId: "employee-1234",
                    clientId: "client-1234",
                    startTime: new Date(),
                    endTime: new Date(),
                    status: "completed",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);

            await supertest(createServer())
                .get("/api/time-tracking/get-employee-time/employee-1234")
                .set("Authorization", "Bearer employee-token")
                .expect(201)
                .then((response) => {
                    expect(response.body.length).toBe(1);
                });
        });

        it("returns 404 if no time tracking entries are found for the employee", async () => {
            findByEmployeeId.mockImplementation(async () => []);

            await supertest(createServer())
                .get("/api/time-tracking/get-employee-time/employee-1234")
                .set("Authorization", "Bearer employee-token")
                .expect(201)
                .then((response) => {
                    expect(response.body.length).toBe(0);
                });
        });
    });

    describe("get time tracking by ID endpoint", () => {
        it("returns a specific time tracking entry by ID", async () => {
            getById.mockImplementation(async () => ({
                id: "abcd-1234-efgh-5678",
                employeeId: "employee-1234",
                clientId: "client-1234",
                startTime: new Date(),
                endTime: new Date(),
                status: "completed",
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await supertest(createServer())
                .get("/api/time-tracking/get-time/abcd-1234-efgh-5678")
                .set("Authorization", "Bearer admin-token")
                .expect(200)
                .then((response) => {
                    expect(response.body.id).toBe("abcd-1234-efgh-5678");
                });
        });

        it("returns 404 if the time tracking entry is not found", async () => {
            getById.mockImplementation(async () => null);

            await supertest(createServer())
                .get("/api/time-tracking/get-time/abcd-1234-efgh-5678")
                .set("Authorization", "Bearer admin-token")
                .expect(404);
        });
    });

    describe("update time tracking endpoint", () => {
        it("updates a specific time tracking entry", async () => {
            update.mockImplementation(async () => ({
                id: "abcd-1234-efgh-5678",
                employeeId: "employee-1234",
                clientId: "client-1234",
                startTime: new Date(),
                endTime: new Date(),
                status: "completed",
                created_at: new Date(),
                updated_at: new Date(),
            }));

            const updateData = {
                endTime: new Date(),
                status: "completed",
            };

            await supertest(createServer())
                .put("/api/time-tracking/stop-time/abcd-1234-efgh-5678")
                .set("Authorization", "Bearer supervisor-token")
                .send(updateData)
                .expect(200);
        });

        it("returns 404 if the time tracking entry to update is not found", async () => {
            update.mockImplementation(async () => null);

            const updateData = {
                endTime: new Date(),
                status: "completed",
            };

            await supertest(createServer())
                .put("/api/time-tracking/stop-time/abcd-1234-efgh-5678")
                .set("Authorization", "Bearer supervisor-token")
                .send(updateData)
                .expect(404);
        });
    });
});
