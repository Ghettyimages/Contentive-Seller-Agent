import crypto from 'crypto';

export interface LicensePayload {
  tenantId: string;
  plan: 'dev' | 'standard' | 'enterprise';
  seats?: number;
  properties?: number;
  exp?: number; // epoch seconds
}

export function signLicense(payload: LicensePayload, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function checkLicense(tenantId: string, token: string, secret: string): { valid: boolean; payload?: LicensePayload; reason?: string } {
  const [body, sig] = token.split('.');
  if (!body || !sig) return { valid: false, reason: 'malformed' };
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) {
    return { valid: false, reason: 'bad-signature' };
  }
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as LicensePayload;
  if (payload.tenantId !== tenantId) return { valid: false, reason: 'wrong-tenant' };
  if (payload.exp && Date.now() / 1000 > payload.exp) return { valid: false, reason: 'expired' };
  return { valid: true, payload };
}

export type TelemetryEvent = {
  tenantId: string;
  event: string;
  at: string;
  details?: Record<string, unknown>;
};

export function emitTelemetry(hook: (e: TelemetryEvent) => void, event: TelemetryEvent) {
  try {
    hook(event);
  } catch {
    // swallow
  }
}
