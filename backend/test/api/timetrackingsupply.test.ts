import supertest from "supertest";
import { createServer } from "../../src/server";
import TimeTrackingSupplyRepository from "../../src/repositories/TimeTrackingSupplyRepository";
import { Request, Response, NextFunction } from "express";

// Mock the authentication middleware
jest.mock("../../src/middleware/authMiddleware", () => ({
    verifyToken: jest.fn((requiredRole) => (req: Request, res: Response, next: NextFunction) => {
        req.user = { role: requiredRole };
        next();
    }),
}));

// Create mocks for TimeTrackingSupplyRepository methods
const create = jest.fn();
const findByTimeTrackingId = jest.fn();
const findBySupplyId = jest.fn();

// Mock the TimeTrackingSupplyRepository class
jest.mock("../../src/repositories/TimeTrackingSupplyRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            create,
            findByTimeTrackingId,
            findBySupplyId,
        };
    });
});

beforeEach(() => {
    create.mockClear();
    findByTimeTrackingId.mockClear();
    findBySupplyId.mockClear();
});

describe("TimeTrackingSupply API", () => {
    describe("add supplies to time tracking endpoint", () => {
        it("adds supplies to a time tracking entry", async () => {
            create.mockImplementation(async () => ({
                timeTrackingId: "timeTracking-1234",
                supplyId: "supply-1234",
            }));

            const newSupplies = [
                { supplyId: "supply-1234" },
                { supplyId: "supply-5678" },
            ];

            await supertest(createServer())
                .post("/api/time-tracking-supply/timetracking/timeTracking-1234/supplies")
                .set("Authorization", "Bearer employee-token")
                .send(newSupplies)
                .expect(201);
        });

        it("returns 500 for invalid data", async () => {
            create.mockImplementation(() => {
                throw new Error("Invalid data");
            });

            const invalidSupplies = [
                { supplyId: "" },
            ];

            await supertest(createServer())
                .post("/api/time-tracking-supply/timetracking/timeTracking-1234/supplies")
                .set("Authorization", "Bearer employee-token")
                .send(invalidSupplies)
                .expect(500);
        });
    });

    describe("get supplies by time tracking ID endpoint", () => {
        it("returns supplies associated with a specific time tracking ID", async () => {
            findByTimeTrackingId.mockImplementation(async () => [
                { timeTrackingId: "timeTracking-1234", supplyId: "supply-1234" },
                { timeTrackingId: "timeTracking-1234", supplyId: "supply-5678" },
            ]);

            await supertest(createServer())
                .get("/api/time-tracking-supply/timetracking/timeTracking-1234/supplies")
                .set("Authorization", "Bearer supervisor-token")
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(2);
                });
        });

        it("returns 404 if no supplies are found for the given time tracking ID", async () => {
            findByTimeTrackingId.mockImplementation(async () => []);

            await supertest(createServer())
                .get("/api/time-tracking-supply/timetracking/timeTracking-1234/supplies")
                .set("Authorization", "Bearer supervisor-token")
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(0);
                });
        });
    });

    describe("get time trackings by supply ID endpoint", () => {
        it("returns time trackings associated with a specific supply ID", async () => {
            findBySupplyId.mockImplementation(async () => [
                { timeTrackingId: "timeTracking-1234", supplyId: "supply-1234" },
                { timeTrackingId: "timeTracking-5678", supplyId: "supply-1234" },
            ]);

            await supertest(createServer())
                .get("/api/time-tracking-supply/supply/supply-1234/timetrackings")
                .set("Authorization", "Bearer supervisor-token")
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(2);
                });
        });

        it("returns 404 if no time trackings are found for the given supply ID", async () => {
            findBySupplyId.mockImplementation(async () => []);

            await supertest(createServer())
                .get("/api/time-tracking-supply/supply/supply-1234/timetrackings")
                .set("Authorization", "Bearer supervisor-token")
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(0);
                });
        });
    });
});
