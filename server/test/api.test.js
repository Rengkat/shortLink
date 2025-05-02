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
