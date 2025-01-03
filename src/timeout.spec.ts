import { describe, expect, it } from "bun:test";
import { timeout } from "./timeout";

describe("timeout", () => {
  it("returns a reason if a response is received after the specified wait time", async () => {
    await expect(timeout(50)).rejects.toThrow("The operation was timed out");
  });
});
