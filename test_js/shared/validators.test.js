import { describe, it, expect } from "vitest";  
import { validateUsername, validateToken } from "../../lib/shared/validators.js";

describe("validateUsername", () => {
  it("should throw an error if username is missing", () => {
    expect(() => validateUsername()).toThrow('Username is required to fetch GitHub contributions.');
  });


it("should throw an error if username is an empty string", () => {
    expect(() => validateUsername('')).toThrow('Username is required to fetch GitHub contributions.');
});

describe("validateToken", () => {
  it("should throw an error if token is missing", () => {
    expect(() => validateToken()).toThrow('GitHub token is not configured. Please set the GITHUB_TOKEN environment variable.');
  });
 });
});