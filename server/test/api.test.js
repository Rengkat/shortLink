const request = require("supertest");
const app = require("../index");

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
