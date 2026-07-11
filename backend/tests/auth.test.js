import request from "supertest";
import app from "../app.js";

describe("Authentication API", () => {
    describe("POST /api/auth/register", () => {
        it("should register a new user successfully", async () => {
            const response = await request(app)
                .post("/api/auth/register")
                .send({
                    name: "Raj",
                    email: "raj@gmail.com",
                    password: "raj123"
                });

            expect(response.statusCode).toBe(201);
        });
    });
});