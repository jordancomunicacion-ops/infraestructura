#!/bin/sh
apk add --no-cache curl
# Fetch CSRF and cookies
csrf=$(curl -s -c cookies.txt http://127.0.0.1:3000/api/auth/csrf | sed -n 's/.*"csrfToken":"\([^"]*\)".*/\1/p')
echo "Token: $csrf"

# Post Credentials
# Note: NextAuth often responds with 200 OK and a URL in the JSON body, or a 302 Redirect.
# We use -v to see headers.
curl -v -b cookies.txt -c cookies.txt -X POST \
  -d "csrfToken=$csrf" \
  -d "email=grenecia@sotodelprior.com" \
  -d "password=123456" \
  http://127.0.0.1:3000/api/auth/callback/credentials
