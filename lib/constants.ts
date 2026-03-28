export const APP_NAME = "SnapLayout";
export const APP_TAGLINE = "Turn screenshots into editable layouts";
export const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;
export const STORAGE_KEY = "snaplayout.project.v1";
export const DEFAULT_ANALYSIS_TIMEOUT_MS = 25_000;
export const DEFAULT_RATE_LIMIT_WINDOW_MS = 60_000;
export const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 8;
