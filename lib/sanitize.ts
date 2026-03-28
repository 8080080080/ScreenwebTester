export function stripCodeFences(value: string) {
  return value.replace(/^```[a-zA-Z0-9]*\s*/u, "").replace(/\s*```$/u, "").trim();
}

export function sanitizePlainText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function escapeTemplateLiteral(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

export function sanitizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "#";
  }

  if (trimmed.startsWith("#")) {
    return trimmed;
  }

  if (/^https?:\/\//u.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }

  return `https://${trimmed.replace(/^\/+/u, "")}`;
}
