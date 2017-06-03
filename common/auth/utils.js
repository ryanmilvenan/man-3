import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
export const ID_TOKEN = 'id_token';
export const PROFILE = 'profile';

export const setStoredAuthState = (profile, idToken) => {
  if(typeof window !== 'undefined') {
    const decoded = jwt_decode(idToken);
    const expires = new Date(Number(decoded.exp) * 1000);
    Cookies.set(ID_TOKEN, idToken, { expires });
    Cookies.set(PROFILE, JSON.stringify(profile));

    localStorage.setItem(ID_TOKEN, idToken);
    localStorage.setItem(PROFILE, JSON.stringify(profile));
  }
};

export const removeStoredAuthState = () => {
  if(typeof window !== 'undefined') {
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(PROFILE);

    Cookies.remove(ID_TOKEN);
    Cookies.remove(PROFILE);
  }
};

export const getStoredAuthState = () => {
  try {
    if( typeof window !== 'undefined') {
      const idToken = localStorage.getItem(ID_TOKEN);
      const profile = Object.assign({}, JSON.parse(localStorage.getItem(PROFILE)));
      return {
        idToken,
        profile
      }
    } else {
      return {};
    }
  } catch (err) {
    removeStoredAuthState();
    return {};
  }
};