import { getServerEnv } from "@/lib/env";
import { AppError } from "@/lib/errors";

type Bucket = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Bucket>();

export function enforceRateLimit(key: string) {
  const env = getServerEnv();
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + env.RATE_LIMIT_WINDOW_MS,
    });
    return;
  }

  if (current.count >= env.RATE_LIMIT_MAX_REQUESTS) {
    throw new AppError("RATE_LIMITED", "Analysis limit reached. Please wait a minute and try again.", 429);
  }

  current.count += 1;
  store.set(key, current);
}

export function resetRateLimitStore() {
  store.clear();
}
