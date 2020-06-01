import { tournamentsReceived, tournamentsError } from '../actions/tournaments';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { callTournamentServer } from '../utils/callTournamentServer';

export function fetchTournaments() {
  return function(dispatch) {
    return fetch(API_TOURNAMENTS_URL)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(response) {
        dispatch(tournamentsReceived(response));
      })
      .catch(function(error) {
        dispatch(tournamentsError());
      });
  };
}

export function editTournament(id, name) {
  return function(dispatch) {
    return callTournamentServer('PATCH', { id: id, param: { name: name } })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(response) {
        dispatch(fetchTournaments());
      })
      .catch(function(error) {
        alert('edit failed');
      });
  };
}

export function createTournament(name) {
  return function(dispatch) {
    return callTournamentServer('POST', { param: { name: name } })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(response) {
        dispatch(fetchTournaments());
      })
      .catch(function(error) {
        alert('create failed');
      });
  };
}

export function deleteTournament(id) {
  return function(dispatch) {
    return callTournamentServer('DELETE', { id: id })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(response) {
        dispatch(fetchTournaments());
      })
      .catch(function(error) {
        alert('delete failed');
      });
  };
}
