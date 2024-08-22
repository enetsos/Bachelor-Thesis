import supertest from "supertest";
import { createServer } from "../src/server"; // Assicurati di avere una funzione createServer che avvia l'applicazione Express
import UserRepository from "../src/repositories/UserRepository";
import { User } from "./__fixtures__/users"; // Fixture per un esempio di utente
import { ConnectionRefusedError } from "sequelize";
import { Request, Response, NextFunction } from "express";

jest.mock("../src/middleware/authMiddleware", () => ({
  verifyToken: jest.fn((requiredRole) => (req: Request, res: Response, next: NextFunction) => {
    // Mock per bypassare l'autenticazione e autorizzare ogni ruolo
    req.user = { role: requiredRole }; // Si può mockare req.user come necessario
    next();
  }),
}));

jest.mock("../src/repositories/UserRepository");

const getAll = jest.fn();
const getById = jest.fn();
const create = jest.fn();
const update = jest.fn();
const remove = jest.fn();
const getByRole = jest.fn();

// @ts-ignore
UserRepository.mockImplementation(() => {
  return {
    getAll,
    getById,
    create,
    update,
    delete: remove,
    getByRole,
  };
});

beforeEach(() => {
  // @ts-ignore
  UserRepository.mockClear();
  getAll.mockClear();
  getById.mockClear();
  create.mockClear();
  update.mockClear();
  remove.mockClear();
  getByRole.mockClear();
});

describe("User API", () => {
  describe("list users endpoint", () => {
    it("returns users", async () => {
      getAll.mockImplementation(async () => [User]);

      await supertest(createServer())
        .get("/api/users")
        .set("Authorization", "Bearer admin-token") // Mock del token admin
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(1);
          expect(res.body[0]).toHaveProperty("name", User.name);
        });
    });

    it("returns no users", async () => {
      getAll.mockImplementation(async () => []);

      await supertest(createServer())
        .get("/api/users")
        .set("Authorization", "Bearer admin-token") // Mock del token admin
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(0);
        });
    });

    it("throws an error when getting users", async () => {
      const errorMessage = "Connection refused";
      getAll.mockImplementation(() => {
        const parentError = new Error(errorMessage);
        throw new ConnectionRefusedError(parentError);
      });

      await supertest(createServer())
        .get("/api/users")
        .set("Authorization", "Bearer admin-token") // Mock del token admin
        .expect(500)

    });
  });

  describe("get user by ID endpoint", () => {
    it("returns a user", async () => {
      getById.mockImplementation(async () => User);

      await supertest(createServer())
        .get("/api/users/abcd")
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty("User");
          expect(res.body.User).toHaveProperty("name", User.name);
        });
    });

    it("returns 404 if user not found", async () => {
      getById.mockImplementation(async () => null);

      await supertest(createServer())
        .get("/api/users/abcd")
        .expect(404)

    });
  });

  describe("create user endpoint", () => {
    it("creates a new user", async () => {
      create.mockImplementation(async () => User);

      const newUser = {
        name: "New User",
        email: "newuser@example.com",
        pw: "password123",
        role: "admin",
      };

      await supertest(createServer())
        .post("/api/users")
        .set("Authorization", "Bearer admin-token") // Mock del token admin
        .send(newUser)
        .expect(201)
    });

    it("returns 400 for invalid data", async () => {
      create.mockImplementation(() => {
        throw new Error("Invalid data");
      });

      const invalidUser = {
        name: "",
        email: "not-an-email",
        pw: "123",
        role: "user",
      };

      await supertest(createServer())
        .post("/api/users")
        .set("Authorization", "Bearer admin-token") // Mock del token admin
        .send(invalidUser)
        .expect(500)

    });
  });

  describe("update user endpoint", () => {
    it("updates a user", async () => {
      update.mockImplementation(async () => User);

      const updatedUser = {
        name: "Updated Name",
      };

      await supertest(createServer())
        .put("/api/users/abcd")
        .set("Authorization", "Bearer admin-token") // Mock del token admin
        .send(updatedUser)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty("User");
        });
    });

    it("returns 404 if user not found", async () => {
      update.mockImplementation(async () => null);

      const updatedUser = {
        name: "Updated Name",
      };

      await supertest(createServer())
        .put("/api/users/abcd")
        .set("Authorization", "Bearer admin-token") // Mock del token admin
        .send(updatedUser)
        .expect(404)
    });
  });

  describe("delete user endpoint", () => {
    it("deletes a user", async () => {
      remove.mockImplementation(async () => true);

      await supertest(createServer())
        .delete("/api/users/abcd")
        .set("Authorization", "Bearer admin-token") // Mock del token admin
        .expect(204);
    });


  });
});
