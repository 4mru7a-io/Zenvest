# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in Zenvest, please email **dev@zenvest.app** instead of using the issue tracker.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work on a fix promptly.

## Security Measures

- Environment variables never exposed in builds
- Firebase security rules configured
- User input sanitized
- XSS protection enabled
- No sensitive data in logs

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x (current) | ✅ Yes |
| < 1.0 | ❌ No |

## Dependencies

We keep dependencies up-to-date. Run `npm audit` regularly to check for vulnerabilities.

```bash
npm audit          # Check vulnerabilities
npm audit fix      # Fix automatically
```
