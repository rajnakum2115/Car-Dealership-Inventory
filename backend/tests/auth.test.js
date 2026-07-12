import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../app.js";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
});

describe("Authentication API", () => {

    // -----------------------------
    // Registration Test
    // -----------------------------
    describe("POST /api/auth/register", () => {

        it("should register a new user successfully", async () => {

            // const email = `raj${Date.now()}@gmail.com`;
            const email = `raj${Date.now()}_${Math.floor(Math.random() * 100000)}@gmail.com`;

            const response = await request(app)
                .post("/api/auth/register")
                .send({
                    name: "Raj",
                    email,
                    password: "raj123"
                });

            expect(response.statusCode).toBe(201);

            expect(response.body.user).toBeDefined();

            expect(response.body.user.name).toBe("Raj");

            expect(response.body.user.email).toBe(email);

            expect(response.body.user.role).toBe("user");

            expect(response.body.user.password).toBeUndefined();
        });

    });

    // -----------------------------
    // Login Test
    // -----------------------------
    describe("POST /api/auth/login", () => {

        it("should login successfully with valid credentials", async () => {

            // const email = `raj${Date.now()}@gmail.com`;
            const email = `raj${Date.now()}_${Math.floor(Math.random() * 100000)}@gmail.com`;

            // First register the user
            await request(app)
                .post("/api/auth/register")
                .send({
                    name: "Raj",
                    email,
                    password: "raj123"
                });

            const response = await request(app)
                .post("/api/auth/login")
                .send({
                    email,
                    password: "raj123"
                });
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.body);
            expect(response.statusCode).toBe(200);

            expect(response.body.user).toBeDefined();

            expect(response.body.user.email).toBe(email);

            expect(response.body.token).toBeDefined();
        });

    });

    describe("GET /api/auth/profile", () => {

        it("should deny access without JWT token", async () => {

            const response = await request(app)
                .get("/api/auth/profile");

            expect(response.statusCode).toBe(401);

        });
    });

});