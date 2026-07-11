import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../app.js";
import User from "../models/User.js";

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

describe("DELETE /api/vehicles/:id", () => {

    it("should allow admin to delete vehicle", async () => {

        // Register an admin user
        const email = `admin${Date.now()}${Math.floor(Math.random() * 10000)}@gmail.com`;

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email,
                password: "admin123"
            });

        // Change the user's role to admin
        await User.findOneAndUpdate(
            { email },
            { role: "admin" }
        );

        // Login as admin
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "admin123"
            });

        const adminToken = loginResponse.body.token;

        // Create a vehicle
        const vehicleResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                name: "Fortuner",
                brand: "Toyota",
                category: "SUV",
                price: 4200000,
                image: "https://example.com/car.jpg",
                description: "Toyota Fortuner SUV",
                quantity: 5
            });

        const vehicleId = vehicleResponse.body._id;

        // Delete the vehicle
        const response = await request(app)
            .delete(`/api/vehicles/${vehicleId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message).toBe("Vehicle deleted successfully");

    });

});

describe("POST /api/vehicles/:id/purchase", () => {

    it("should purchase a vehicle and decrease quantity", async () => {

        // Register user
        const email = `raj${Date.now()}_${Math.floor(Math.random() * 10000)}@gmail.com`;

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

        // Purchase
        const response = await request(app)
            .post(`/api/vehicles/${vehicleId}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.quantity).toBe(4);

    });

});

describe("POST /api/vehicles/:id/restock", () => {

    it("should allow admin to restock vehicle", async () => {

        const email = `admin${Date.now()}_${Math.floor(Math.random()*10000)}@gmail.com`;

        await request(app)
            .post("/api/auth/register")
            .send({
                name:"Admin",
                email,
                password:"admin123"
            });

        await User.findOneAndUpdate(
            { email },
            {
                role:"admin"
            }
        );

        const login = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password:"admin123"
            });

        const adminToken = login.body.token;

        const createdVehicle = await request(app)
            .post("/api/vehicles")
            .set("Authorization",`Bearer ${adminToken}`)
            .send({
                name:"Fortuner",
                brand:"Toyota",
                category:"SUV",
                price:4200000,
                image:"https://example.com/car.jpg",
                description:"SUV",
                quantity:5
            });

        const vehicleId = createdVehicle.body._id;

        const response = await request(app)
            .post(`/api/vehicles/${vehicleId}/restock`)
            .set("Authorization",`Bearer ${adminToken}`)
            .send({
                quantity:5
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.quantity).toBe(10);

    });

});