import jwt_decode, { JwtPayload } from 'jwt-decode';

interface IParseToken extends JwtPayload {
  login: string;
  userId: string;
}

export const jwtDecode = (token: string) => {
  const parseToken = jwt_decode<IParseToken>(token);

  return parseToken;
};
