import { describe, it, expect, vi, afterEach } from "vitest";
import handler from "../../api/streak/svg.js";
import * as githubClient from "../../lib/github/githubClient.js";
import { NotFoundError } from "../../lib/shared/errors/NotFoundError.js";

afterEach(() => {
    vi.restoreAllMocks();
});


const createMockRes = () => {
    const res ={
        statusCode: 200,
        headers: {},
        body: null
    };

   res.setHeader = (key, value) => {
    res.headers[key] = value;
  };

    res.getHeader = (key) => res.headers[key];

  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  res.send = (data) => {
    res.body = data;
    return res;
  };

  return res;

}


describe("SVG Endppoint errors", () => {
    it("should return error SVG when user is missing", async () => {
        const req = {
              query: {},
              headers: {},
            };
        
            const res = createMockRes();
        
            await handler(req, res);

            expect(res.statusCode).toBe(400),
            expect(res.headers["Content-Type"]).toBe("image/svg+xml");
            expect(res.body).toContain("<svg");
            expect(res.body.toLowerCase()).toContain("bad request");
    });




    it("should return error svg when user is not found", async () => {

        vi.spyOn(githubClient, "fetchUserContributions")
          .mockRejectedValueOnce(new NotFoundError("User not found"));

       const req = {
              query: {user:"fakeUser"},
              headers: {},
            };
        
            const res = createMockRes();
        
            await handler(req, res);

            expect(res.statusCode).toBe(404),
            expect(res.headers["Content-Type"]).toBe("image/svg+xml");
            expect(res.body).toContain("<svg");
            expect(res.body.toLowerCase()).toContain("not found"); 
    });


    it("should return error svg when system error", async () => {
        vi.spyOn(githubClient, "fetchUserContributions")
          .mockRejectedValueOnce(new Error("Unexpected error"));

       const req = {
              query: {user:"octocat"},
              headers: {},
            };
        
            const res = createMockRes();
        
            await handler(req, res);

            expect(res.statusCode).toBe(500),
            expect(res.headers["Content-Type"]).toBe("image/svg+xml");
            expect(res.body).toContain("<svg");
            expect(res.body.toLowerCase()).toContain("unexpected error"); 
    });

});

