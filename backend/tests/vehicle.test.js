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

describe("POST /api/vehicles", () => {

    it("should create a vehicle", async () => {

        const res = await request(app)
            .post("/api/vehicles")
            .send({
                name: "Fortuner",
                brand: "Toyota",
                category: "SUV",
                price: 4200000,
                image: "https://example.com/toyota.jpg",
                description: "Toyota Fortuner SUV",
                quantity: 5
            });

        console.log(res.statusCode);
        console.log(res.body);

        expect(res.statusCode).toBe(201);

    });

});

describe("GET /api/vehicles", () => {

    it("should return all vehicles", async () => {

        const response = await request(app)
            .get("/api/vehicles");

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

    });

});

describe("GET /api/vehicles/search", () => {

    it("should search vehicles by category", async () => {

        const response = await request(app)
            .get("/api/vehicles/search?category=SUV");

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

    });

});

describe("PUT /api/vehicles/:id", () => {

    it("should update a vehicle", async () => {

        // Create a vehicle first
        const createdVehicle = await request(app)
            .post("/api/vehicles")
            .send({
                name: "Fortuner",
                brand: "Toyota",
                category: "SUV",
                price: 4200000,
                image: "https://example.com/toyota.jpg",
                description: "Toyota Fortuner SUV",
                quantity: 5
            });

        const response = await request(app)
            .put(`/api/vehicles/${createdVehicle.body._id}`)
            .send({
                price: 4500000,
                quantity: 10
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.price).toBe(4500000);

        expect(response.body.quantity).toBe(10);

    });

});