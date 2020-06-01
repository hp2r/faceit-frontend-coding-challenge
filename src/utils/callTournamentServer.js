import { API_TOURNAMENTS_URL } from '../constants/api';

export async function callTournamentServer(method, data = {}) {
  const affix = method === 'PATCH' || method === 'DELETE' ? '/' + data.id : '';
  const response = await fetch(API_TOURNAMENTS_URL + affix, {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data.param)
  });
  return response;
}
