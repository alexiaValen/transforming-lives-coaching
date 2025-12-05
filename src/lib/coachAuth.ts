import crypto from 'crypto';

// Lightweight HMAC-signed token helpers for coach cookie
export function signPayload(payload: string, secret: string) {
  // payload is base64url(payloadJson).signature
  const p = Buffer.from(payload, 'utf8').toString('base64url');
  const h = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${p}.${h}`;
}

export function verifySigned(signed: string, secret: string) {
  try {
    const [p, sig] = signed.split('.');
    if (!p || !sig) return null;
    const payload = Buffer.from(p, 'base64url').toString('utf8');
    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
    if (expectedSig === sig) return payload;
    return null;
  } catch {
    return null;
  }
}
