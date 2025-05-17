export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const GOOGLE_REDIRECT_URI = `${import.meta.env.VITE_APP_URL}/auth/callback`;
export const GOOGLE_SCOPES = ['email', 'profile'];

export const GOOGLE_AUTH_CONFIG = {
  flow: 'pkce',
  responseType: 'code',
  accessType: 'offline',
  prompt: 'consent'
};