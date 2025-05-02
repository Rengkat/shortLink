const request = require("supertest");
const app = require("../index");
const db = require("../db/db");

describe("URL Shortener API", () => {
  afterAll(() => {
    if (app.server) {
      app.server.close();
    }
  });

  test("should encode a URL", async () => {
    const response = await request(app)
      .post("/api/encode")
      .send({ longUrl: "https://indicina.co" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("shortUrl");
    expect(response.body.shortUrl).toMatch(/^http:\/\/short\.est\/[a-zA-Z0-9]{6}$/);
  });

  test("should return 400 for missing URL", async () => {
    const response = await request(app).post("/api/encode").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
//decode
describe("GET /api/decode", () => {
  test("should return original long URL for valid short URL", async () => {
    //encode it first
    const encodeResponse = await request(app)
      .post("/api/encode")
      .send({ longUrl: "https://indicina.co" });
    const shortUrl = encodeResponse.body.shortUrl;

    // Then decode it
    const decodeResponse = await request(app).get("/api/decode").send({ shortUrl });
    expect(decodeResponse.statusCode).toBe(200);
    expect(decodeResponse.body).toEqual({
      longUrl: "https://indicina.co",
    });
  });
  //error
  test("should return 400 for not entering short URL", async () => {
    const response = await request(app).get("/api/decode").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
  test("should return 404 for not entering valid short URL", async () => {
    const response = await request(app).get("/api/decode").send({ shortUrl: "2345" });
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
describe("GET /redirect/:code", () => {
  test("should redirect to long URL when valid code is provided", async () => {
    // First encode a URL
    const encodeResponse = await request(app)
      .post("/api/encode")
      .send({ longUrl: "https://indicina.co" });

    // Extract the code from the shortUrl
    const shortUrl = encodeResponse.body.shortUrl;
    const code = shortUrl.split("/").pop();

    // Increment before redirecting
    const initialEntry = db[shortUrl];
    expect(initialEntry.visits).toBe(0);

    // Test the redirect
    const response = await request(app).get(`/api/redirect/${code}`).redirects(0);
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("https://indicina.co");

    // Verify visits count was incremented after visiting
    const updatedEntry = db[shortUrl];
    expect(updatedEntry.visits).toBe(1);
  });

  test("should return 404 for invalid code", async () => {
    const response = await request(app).get("/api/redirect/invalidcode").redirects(0);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
