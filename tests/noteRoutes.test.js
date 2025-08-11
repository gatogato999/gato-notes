// handle notes
const request = require("supertest");
const db = require("../server/db");
const noteRoutes = require("../server/noteRoutes");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api", noteRoutes);

// control test data
const wipeDb = () => {
  db.exec("DELETE FROM notes");
};
const populateDb = () => {
  const stmt1 = db.prepare(`INSERT INTO notes (title, content) VALUES (? , ?)`);
  const info1 = stmt1.run("title 1", "content 1");

  return info1.lastInsertRowid;
};

// TODO : refactor to add the user_id column
// TODO : refactor to improve test coverage

describe("Post /api/notes", () => {
  it("should create a new note and returns it ", async () => {
    const response = await request(app).post("/api/notes").send({
      title: "first note",
      content: "this is my content , howdy ?",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("first note");
    expect(response.body.content).toBe("this is my content , howdy ?");
  });
});
describe("Get /api/notes", () => {
  beforeAll(wipeDb);
  beforeEach(populateDb);
  afterEach(wipeDb);

  it("should return all stored notes ", async () => {
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0].title).toBe("title 1");
    expect(response.body[0]).toHaveProperty("content");
    expect(response.body[0].content).toBe("content 1");
  });
});
describe("Get /api/notes/:id", () => {
  let lastID;
  beforeAll(wipeDb);
  beforeEach(() => {
    lastID = populateDb();
  });
  afterEach(wipeDb);

  it(`should return a note with the specified id 
    and return an error if not found`, async () => {
    const response1 = await request(app).get(`/api/notes/${lastID}`);

    expect(response1.status).toBe(200);
    expect(response1.body).toHaveProperty("id");
    expect(response1.body).toHaveProperty("title");
    expect(response1.body.title).toBe("title 1");
    expect(response1.body).toHaveProperty("content");
    expect(response1.body.content).toBe("content 1");

    // a wrong id
    const response2 = await request(app).get("/api/notes/8");
    expect(response2.status).toBe(404);
    expect(response2.body).toEqual({ error: "no note found" });
  });
});

describe("PUT /api/notes/:id", () => {
  let lastID;
  beforeAll(wipeDb);
  beforeEach(() => {
    lastID = populateDb();
  });
  afterEach(wipeDb);

  it("should update a note (with id ) , return it  or return error", async () => {
    const response = await request(app).put(`/api/notes/${lastID}`).send({
      title: "updateTestTitle",
      content: "updated content",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "note updated" });

    // error prone
    const wrongRes = await request(app).put(`/api/notes/0`).send({
      title: "updateTestTitle",
      content: "updated content",
    });
    expect(wrongRes.status).toBe(404);
    expect(wrongRes.body).toEqual({ error: "note not updated" });
  });
});
describe("DELETE /api/notes/:id", () => {
  let lastID;
  beforeAll(wipeDb);
  beforeEach(() => {
    lastID = populateDb();
  });
  afterEach(wipeDb);
  it("should delete an existing note if id provided or return an error", async () => {
    const validResponse = await request(app).delete(`/api/notes/${lastID}`);
    expect(validResponse.status).toBe(200);
    expect(validResponse.body).toEqual({ message: "note deleted" });

    const invalidResponse = await request(app).delete(`/api/notes/0`);
    expect(invalidResponse.status).toBe(404);
    expect(invalidResponse.body).toEqual({ error: "not deleted" });
  });
});
