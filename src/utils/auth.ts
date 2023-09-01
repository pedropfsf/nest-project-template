import { Request } from 'express';

export function useAuth() {
  function getToken(request: Request) {
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];
    if (token) {
      return token;
    }
    return '';
  }

  return { getToken };
}
