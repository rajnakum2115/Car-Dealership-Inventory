import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../app.js";

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Authentication API", () => {

    // -----------------------------
    // Registration Test
    // -----------------------------
    describe("POST /api/auth/register", () => {

        it("should register a new user successfully", async () => {

            const email = `raj${Date.now()}@gmail.com`;

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

            const email = `raj${Date.now()}@gmail.com`;

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
                console.log(response.body);
            expect(response.statusCode).toBe(200);

            expect(response.body.user).toBeDefined();

            expect(response.body.user.email).toBe(email);

            expect(response.body.token).toBeDefined();
        });

    });

});