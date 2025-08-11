const request = require("supertest");
const express = require("express");
const app = express();
const db = require("../server/db");
const authRoutes = require("../search/authRoutes");
// const bcrypt = require("bcrypt");

// example
// const hashedpassword = await bcrypt.hash("something", 10);

// TODO : create the test cases for users crud operations

// user => first_name, last_name, email, password
describe("POST /api/users", () => {
  it.todo(
    "should create a user with valid inputs , else error message",
    async () => {},
  );
});
describe("GET /api/users", () => {
  it.todo(
    "should return all users if exits , else error message",
    async () => {},
  );
});
describe("GET /api/users/:id", () => {
  it.todo("should return one user (with id)", async () => {});
});
describe("PUT /api/users/:id", () => {
  it.todo("should update user info ", async () => {});
});
describe("DELETE /api/users/:id ", () => {
  it.todo("should delete a user form the database ", async () => {});
});
