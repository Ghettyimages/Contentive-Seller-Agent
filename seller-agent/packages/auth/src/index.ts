import crypto from 'crypto';

export function signRequest(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64');
}

export function verifySignature(
  headers: Record<string, string | string[] | undefined>,
  body: string,
  secret: string,
  maxSkewMs: number = 300000,
): boolean {
  const apiKey = headers['x-api-key'];
  const signature = headers['x-signature'];
  const timestamp = headers['x-timestamp'];

  if (!apiKey || !signature || !timestamp) return false;
  const timestampStr = Array.isArray(timestamp) ? timestamp[0] : timestamp;
  const providedSig = (Array.isArray(signature) ? signature[0] : signature) ?? '';

  const now = Date.now();
  const ts = Number(timestampStr);
  if (!Number.isFinite(ts) || Math.abs(now - ts) > maxSkewMs) return false;

  const expected = signRequest(`${timestampStr}${body}`, secret);
  // Avoid timingSafeEqual throwing on length mismatch
  if (expected.length !== providedSig.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(providedSig));
  } catch {
    return false;
  }
}

// NextAuth config placeholder
export const nextAuthConfig = {
  providers: [
    // Google provider configured by the app (clientId/secret via env)
  ],
};
