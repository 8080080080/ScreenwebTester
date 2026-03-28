export type ApiErrorCode =
  | "NO_FILE"
  | "INVALID_FILE_TYPE"
  | "FILE_TOO_LARGE"
  | "RATE_LIMITED"
  | "AI_TIMEOUT"
  | "AI_UNAVAILABLE"
  | "MALFORMED_ANALYSIS"
  | "GENERATION_FAILED"
  | "CONFIG_ERROR"
  | "UNKNOWN_ERROR";

export class AppError extends Error {
  code: ApiErrorCode;
  status: number;

  constructor(code: ApiErrorCode, message: string, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}
