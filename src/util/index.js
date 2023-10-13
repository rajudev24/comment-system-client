export function extractUserInfoFromToken() {
    const accessToken = localStorage.getItem('access_token');
    const parts = accessToken.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }
    const payloadBase64 = parts[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload?._id
}

