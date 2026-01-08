
const cookieJar = new Map();

async function fetchWithCookies(url, options = {}) {
    const headers = options.headers || {};
    // Add cookies to request
    const cookieHeader = Array.from(cookieJar.entries()).map(([k, v]) => `${k}=${v}`).join('; ');
    if (cookieHeader) headers['Cookie'] = cookieHeader;
    options.headers = headers;

    console.log(`FETCH: ${url}`, options.method || 'GET');

    // Node 20 has native fetch? Yes.
    const res = await fetch(url, options);

    // Store cookies from response
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
        setCookie.split(',').forEach(c => {
            const parts = c.split(';');
            const [key, value] = parts[0].split('=');
            if (key) cookieJar.set(key.trim(), value.trim());
        });
    }

    return res;
}

async function main() {
    try {
        const baseUrl = 'http://127.0.0.1:3000';

        // 1. Get CSRF
        console.log('--- 1. Getting CSRF Token ---');
        const r1 = await fetchWithCookies(`${baseUrl}/api/auth/csrf`);
        console.log('CSRF Status:', r1.status);
        const d1 = await r1.json();
        const csrfToken = d1.csrfToken;
        console.log('CSRF Token:', csrfToken);

        if (!csrfToken) throw new Error('No CSRF Token');

        // 2. Login POST
        console.log('--- 2. Posting Credentials ---');
        const r2 = await fetchWithCookies(`${baseUrl}/api/auth/callback/credentials`, {
            method: 'POST',
            redirect: 'manual', // STOP redirects
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                csrfToken,
                email: 'grenecia@sotodelprior.com',
                password: '123456',
                // json: true // NextAuth sometimes wants this
            }).toString()
        });

        console.log('Login Status:', r2.status);
        console.log('Location:', r2.headers.get('location'));
        const text = await r2.text();
        console.log('Response Body Length:', text.length);
        // console.log('Response Body:', text.substring(0, 500));

    } catch (e) {
        console.error('ERROR:', e);
    }
}

main();
