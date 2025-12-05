// Simple smoke test for NextAuth coach flow and protected API
// Usage: set BASE_URL (default http://localhost:3000) and run: node scripts/smoke-test.js

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const COACH_SECRET = process.env.COACH_SECRET || 'coach-open-sesame';

async function ok(res) {
  const text = await res.text();
  try { return { status: res.status, json: JSON.parse(text) }; } catch(e) { return { status: res.status, text }; }
}

async function test() {
  console.log('Base URL:', BASE);

  console.log('\n1) Unauthenticated request to /api/coach/clients/1');
  try {
    const res = await fetch(`${BASE}/api/coach/clients/1`);
    const body = await ok(res);
    console.log('Status:', res.status, 'Body:', body);
    if (res.status === 401) console.log('✅ Unauthenticated access correctly blocked');
    else console.log('⚠️ Unexpected response for unauthenticated request');
  } catch (err) {
    console.error('Request failed:', err.message);
    return process.exitCode = 2;
  }

  console.log('\n2) Attempt credentials sign-in to /api/auth/callback/credentials');
  try {
    const form = new URLSearchParams();
    form.append('role', 'coach');
    form.append('name', 'Coach');
    form.append('secret', COACH_SECRET);

    const res = await fetch(`${BASE}/api/auth/callback/credentials`, {
      method: 'POST',
      body: form,
      redirect: 'manual'
    });

    console.log('Sign-in endpoint status:', res.status);
    const setCookie = res.headers.get('set-cookie') || res.headers.get('Set-Cookie');
    if (setCookie) console.log('Set-Cookie header present (first bytes):', setCookie.slice(0, 200));
    else console.log('No Set-Cookie header returned; the NextAuth flow may require CSRF/token or client-side signIn.');

    // Try to reuse cookies if present
    let cookieHeader = '';
    if (setCookie) {
      // Use only first cookie name=value pair(s)
      cookieHeader = setCookie.split(',').map(s => s.split(';')[0]).join('; ');
    }

    if (!cookieHeader) {
      console.log('\nSkipping authenticated API test because no cookie returned.');
      return;
    }

    console.log('\n3) Request protected API with cookie');
    const res2 = await fetch(`${BASE}/api/coach/clients/1`, {
      headers: { Cookie: cookieHeader }
    });
    const body2 = await ok(res2);
    console.log('Status:', res2.status, 'Body:', body2);
    if (res2.status === 200) console.log('✅ Authenticated access succeeded');
    else console.log('❌ Authenticated access failed — status', res2.status);
  } catch (err) {
    console.error('Sign-in/test failed:', err.message);
    return process.exitCode = 3;
  }
}

test();
