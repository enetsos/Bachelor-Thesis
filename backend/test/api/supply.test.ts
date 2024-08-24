import supertest from "supertest";
import { createServer } from "../../src/server";
import SupplyRepository from "../../src/repositories/SupplyRepository";
import { Request, Response, NextFunction } from "express";

// Mock the authentication middleware
jest.mock("../../src/middleware/authMiddleware", () => ({
    verifyToken: jest.fn((requiredRole) => (req: Request, res: Response, next: NextFunction) => {
        req.user = { role: requiredRole };
        next();
    }),
}));

// Create mocks for SupplyRepository methods
const create = jest.fn();
const getAll = jest.fn();

// Mock the SupplyRepository class
jest.mock("../../src/repositories/SupplyRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            create,
            getAll,
        };
    });
});

beforeEach(() => {
    create.mockClear();
    getAll.mockClear();
});

describe("Supply API", () => {
    describe("create supply endpoint", () => {
        it("creates a new supply", async () => {
            create.mockImplementation(async () => ({
                id: "abcd-1234-efgh-5678",
                name: "New Supply",
                created_at: new Date(),
                updated_at: new Date(),
            }));

            const newSupply = {
                name: "New Supply",
            };

            await supertest(createServer())
                .post("/api/supply/new-supply")
                .set("Authorization", "Bearer admin-token")
                .send(newSupply)
                .expect(201);
        });

        it("returns 500 for invalid data", async () => {
            create.mockImplementation(() => {
                throw new Error("Invalid data");
            });

            const invalidSupply = {
                name: "",
            };

            await supertest(createServer())
                .post("/api/supply/new-supply")
                .set("Authorization", "Bearer admin-token")
                .send(invalidSupply)
                .expect(500);
        });
    });

    describe("get all supplies endpoint", () => {
        it("returns all supplies", async () => {
            getAll.mockImplementation(async () => [
                {
                    id: "abcd-1234-efgh-5678",
                    name: "Supply 1",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: "ijkl-5678-mnop-1234",
                    name: "Supply 2",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);

            await supertest(createServer())
                .get("/api/supply/get-all-supply")
                .set("Authorization", "Bearer admin-token")
                .expect(201)
                .then((response) => {
                    expect(response.body.length).toBe(2);
                });
        });

        it("returns 500 if there is an error retrieving supplies", async () => {
            getAll.mockImplementation(() => {
                throw new Error("Error retrieving supplies");
            });

            await supertest(createServer())
                .get("/api/supply/get-all-supply")
                .set("Authorization", "Bearer admin-token")
                .expect(500);
        });
    });
});
