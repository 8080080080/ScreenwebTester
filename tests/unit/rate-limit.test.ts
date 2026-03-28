import { describe, expect, it } from "vitest";

import { AppError } from "@/lib/errors";
import { enforceRateLimit, resetRateLimitStore } from "@/lib/rate-limit";

describe("enforceRateLimit", () => {
  it("rejects requests after the configured limit", () => {
    resetRateLimitStore();

    let thrown: unknown = null;

    for (let index = 0; index < 9; index += 1) {
      try {
        enforceRateLimit("test-ip");
      } catch (error) {
        thrown = error;
      }
    }

    expect(thrown).toBeInstanceOf(AppError);
    expect((thrown as AppError).code).toBe("RATE_LIMITED");
  });
});
