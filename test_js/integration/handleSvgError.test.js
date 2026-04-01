import { describe, it, expect, vi } from "vitest";

vi.mock("../../lib/github/githubClient.js", => () ({
    
}))


import handler from "../../api/streak/svg.js";

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

    it("should return error svg when incorrects dates", async () => {
       const req = {
              query: {user:"Not user in this PATH"},
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
       const req = {
              query: {user:"Not user in this PATH"},
              headers: {},
            };
        
            const res = createMockRes();
        
            await handler(req, res);

            expect(res.statusCode).toBe(500),
            expect(res.headers["Content-Type"]).toBe("image/svg+xml");
            expect(res.body).toContain("<svg");
            expect(res.body.toLowerCase()).toContain("configuration error"); 
    });

});

