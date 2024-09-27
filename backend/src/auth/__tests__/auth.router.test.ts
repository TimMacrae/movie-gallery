import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { resetDB } from "../../../helper/resetDB.helper";

const testUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

// Before running tests, connect to the test database
beforeAll(async () => {
  await mongoose.connection.close();
  await mongoose.connect(process.env.MONGO_URI_TEST || "");
});

// After all tests, disconnect from the test database
afterAll(async () => {
  await resetDB();
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth/signup").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("email", testUser.email);
    expect(res.body).toHaveProperty("username", testUser.username);
  });

  it("should not register if a value is missing", async () => {
    const res = await request(app).post("/auth/signup").send({
      username: testUser.username,
      email: testUser.email,
    });

    expect(res.statusCode).toBe(400);
  });

  it("should not register a user with the same email", async () => {
    const res = await request(app).post("/auth/signup").send(testUser);
    expect(res.statusCode).toBe(400);
  });

  it("should login an existing user and return _id / email / username and no password", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("email", testUser.email);
    expect(res.body).toHaveProperty("username", testUser.username);
    expect(res.body).not.toHaveProperty("password");
  });

  it("should not login with incorrect credentials", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });
});
