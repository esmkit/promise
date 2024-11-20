import { describe, expect, it } from "bun:test";
import { delay } from "./delay";
import { withTimeout } from "./withTimeout";

describe("withTimeout", () => {
  it("returns the result value if a response is received before the specified wait time", async () => {
    const result = await withTimeout(async () => {
      await delay(50);
      return "foo";
    }, 100);

    expect(result).toEqual("foo");
  });

  it("returns a reason if a response is received after the specified wait time", () => {
    expect(withTimeout(() => delay(1000), 50)).rejects.toThrow("The operation was timed out");
  });
});