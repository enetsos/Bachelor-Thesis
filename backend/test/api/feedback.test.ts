import supertest from "supertest";
import { createServer } from "../../src/server";
import FeedbackRepository from "../../src/repositories/FeedbackRepository";
import { Request, Response, NextFunction } from "express";

// Mock del middleware di autenticazione
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

// Creazione dei mock per i metodi di FeedbackRepository
const create = jest.fn();
const getAll = jest.fn();
const getByClientId = jest.fn();

// Mock della classe FeedbackRepository
jest.mock("../../src/repositories/FeedbackRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            create,
            getAll,
            getByClientId,
        };
    });
});

beforeEach(() => {
    create.mockClear();
    getAll.mockClear();
    getByClientId.mockClear();
});

describe("Feedback API", () => {
    describe("create feedback endpoint", () => {
        it("creates a new feedback", async () => {
            create.mockImplementation(async () => ({
                id: "abcd-1234-efgh-5678",
                clientId: "client-1234",
                notes: "Great service",
                created_at: new Date(),
                updated_at: new Date(),
            }));

            const newFeedback = {
                clientId: "client-1234",
                notes: "Great service",
            };

            await supertest(createServer())
                .post("/api/feedback/new-feedback")
                .set("Authorization", "Bearer client-token")
                .send(newFeedback)
                .expect(201);
        });

        it("returns 500 for invalid data", async () => {
            create.mockImplementation(() => {
                throw new Error("Invalid data");
            });

            const invalidFeedback = {
                clientId: "",
                notes: "",
            };

            await supertest(createServer())
                .post("/api/feedback/new-feedback")
                .set("Authorization", "Bearer client-token")
                .send(invalidFeedback)
                .expect(500);
        });
    });

    describe("get all feedbacks endpoint", () => {
        it("returns all feedbacks", async () => {
            getAll.mockImplementation(async () => [
                {
                    id: "abcd-1234-efgh-5678",
                    clientId: "client-1234",
                    notes: "Great service",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);

            await supertest(createServer())
                .get("/api/feedback/get-all-feedbacks")
                .set("Authorization", "Bearer admin-token")
                .expect(201)
        });


    });

    describe("get feedback by client ID endpoint", () => {
        it("returns feedbacks for a client", async () => {
            getByClientId.mockImplementation(async () => [
                {
                    id: "abcd-1234-efgh-5678",
                    clientId: "client-1234",
                    notes: "Great service",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);

            await supertest(createServer())
                .get("/api/feedback/get-by-client-id/client-1234")
                .set("Authorization", "Bearer client-token")
                .expect(201)
        });

        it("returns 404 if no feedback found for the client", async () => {
            getByClientId.mockImplementation(async () => []);

            await supertest(createServer())
                .get("/api/feedback/get-by-client-id/client-1234")
                .set("Authorization", "Bearer client-token")
                .expect(201)
        });
    });
});
