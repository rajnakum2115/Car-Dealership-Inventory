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

    // Register a user
    const email = `raj${Date.now()}@gmail.com`;

    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Raj",
            email,
            password: "raj123"
        });

    // Login
    const login = await request(app)
        .post("/api/auth/login")
        .send({
            email,
            password: "raj123"
        });

    const token = login.body.token;

    // Create vehicle using JWT
    const res = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Fortuner",
            brand: "Toyota",
            category: "SUV",
            price: 4200000,
            image: "https://example.com/toyota.jpg",
            description: "Toyota Fortuner SUV",
            quantity: 5
        });

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

        // Register user
        const email = `raj${Date.now()}@gmail.com`;

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Raj",
                email,
                password: "raj123"
            });

        // Login
        const login = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "raj123"
            });

        const token = login.body.token;

        // Create vehicle
        const createdVehicle = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Fortuner",
                brand: "Toyota",
                category: "SUV",
                price: 4200000,
                image: "https://example.com/car.jpg",
                description: "SUV",
                quantity: 5
            });

        const vehicleId = createdVehicle.body._id;

        // Update vehicle
        const response = await request(app)
            .put(`/api/vehicles/${vehicleId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                price: 4500000
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.price).toBe(4500000);

    });

});

it("should deny delete access to normal user", async () => {

    const response = await request(app)
        .delete(`/api/vehicles/${vehicleId}`)
        .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toBe(403);

});