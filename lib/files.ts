import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE_BYTES } from "@/lib/constants";
import { AppError } from "@/lib/errors";

export function validateUpload(file: File | null) {
  if (!file) {
    throw new AppError("NO_FILE", "Select a screenshot before starting analysis.", 400);
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    throw new AppError("INVALID_FILE_TYPE", "Upload a PNG, JPEG, or WebP screenshot.", 415);
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new AppError("FILE_TOO_LARGE", "Screenshot exceeds the 8 MB upload limit.", 413);
  }
}
