import { describe, it, expect } from "vitest";
import { handleGitHubApiResponse, handleMissingUserData, handleMissingUserData } from "../../lib/github/githubResponse.js";


describe("GitHub Response Handlers", () => {
  describe("handleGitHubApiResponse", () => {
    it("should throw an error for non-ok responses", () => {
      const response = { ok: false, status: 404, statusText: "Not Found" };
      expect(() => handleGitHubApiResponse(response)).toThrow("GitHub API error: 404 Not Found");
    });
    it("should not throw an error for ok responses", () => {
        const response = { ok: true };  
        expect(() => handleGitHubApiResponse(response)).not.toThrow();
        });
    });
});

describe("handleMissingUserData", () => {
    it("should throw NotFoundError if userData is null", () => {
      expect(() => handleMissingUserData(null, "testuser")).toThrow("GitHub user 'testuser' not found.");
    });
    it("should not throw an error if userData is present", () => {
      const userData = { login: "testuser" };
      expect(() => handleMissingUserData(userData, "testuser")).not.toThrow();
    });
  });

  