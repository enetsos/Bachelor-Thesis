import supertest from "supertest";
import { createServer } from "../../src/server";
import UserRepository from "../../src/repositories/UserRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Mock the environment variable for JWT_SECRET
process.env.JWT_SECRET = "testsecret";

// Mock the UserRepository methods
const findByEmail = jest.fn();
jest.mock("../../src/repositories/UserRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            findByEmail,
        };
    });
});

// Use jest.spyOn to mock JWT and bcrypt methods
beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
});

describe("Auth API", () => {
    describe("login endpoint", () => {
        it("logs in a user with valid credentials", async () => {
            const mockUser = {
                id: "user-1234",
                email: "user@example.com",
                pw: "hashedpassword",
                role: "user",
            };

            findByEmail.mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);  // Use `as never` to fix type error
            jest.spyOn(jwt, "sign").mockReturnValue("mockToken" as never); // Use `as never` to fix type error

            const loginData = {
                email: "user@example.com",
                password: "password123",
            };

            await supertest(createServer())
                .post("/api/auth/login")
                .send(loginData)
                .expect(200)
                .then((response) => {
                    expect(response.body.message).toBe("Logged in successfully");
                    expect(response.headers["set-cookie"]).toBeDefined();
                });
        });

        it("returns 401 for invalid email", async () => {
            findByEmail.mockResolvedValue(null);

            const loginData = {
                email: "invalid@example.com",
                password: "password123",
            };

            await supertest(createServer())
                .post("/api/auth/login")
                .send(loginData)
                .expect(401)
                .then((response) => {
                    expect(response.body.message).toBe("Invalid email or password");
                });
        });

        it("returns 401 for invalid password", async () => {
            const mockUser = {
                id: "user-1234",
                email: "user@example.com",
                pw: "hashedpassword",
                role: "user",
            };

            findByEmail.mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never); // Use `as never` to fix type error

            const loginData = {
                email: "user@example.com",
                password: "wrongpassword",
            };

            await supertest(createServer())
                .post("/api/auth/login")
                .send(loginData)
                .expect(401)
                .then((response) => {
                    expect(response.body.message).toBe("Invalid email or password");
                });
        });

        it("returns 500 if an error occurs during login", async () => {
            findByEmail.mockRejectedValue(new Error("Database error"));

            const loginData = {
                email: "user@example.com",
                password: "password123",
            };

            await supertest(createServer())
                .post("/api/auth/login")
                .send(loginData)
                .expect(500);
        });
    });

    describe("logout endpoint", () => {
        it("logs out a user", async () => {
            await supertest(createServer())
                .post("/api/auth/logout")
                .expect(200)
                .then((response) => {
                    expect(response.body.message).toBe("Logged out successfully");
                    expect(response.headers["set-cookie"]).toBeDefined();
                    expect(response.headers["set-cookie"][0]).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
                });
        });
    });


});
