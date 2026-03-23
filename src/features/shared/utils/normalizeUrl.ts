/* eslint-disable @typescript-eslint/no-explicit-any */
export function normalizeUrl(value: string, helpers: any) {
  let url = value.trim();

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    const parsed = new URL(url);

    if (!parsed.hostname.includes(".")) {
      return helpers.error("any.invalid");
    }

    return parsed.toString();
  } catch {
    return helpers.error("any.invalid");
  }
}
