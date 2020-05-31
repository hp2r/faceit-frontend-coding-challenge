import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { tournamentsReceived, tournamentsError } from '../actions/tournaments';
import { API_TOURNAMENTS_URL } from '../constants/api';

const store = createStore(rootReducer, applyMiddleware(thunk));

async function callTournamentServer(method, data = {}) {
  // Default options are marked with *
  const affix = (method === 'PATCH' || method === 'DELETE') ? '/'+data.id : '';
  const response = await fetch(API_TOURNAMENTS_URL+affix, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data.param) // body data type must match "Content-Type" header
  });
  return response;//.json(); // parses JSON response into native JavaScript objects
}

export function fetchTournaments() {
   return function(dispatch) {
      return fetch(API_TOURNAMENTS_URL)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      }).then(function(response) {
        dispatch(tournamentsReceived(response))
      }).catch(function(error) {
        dispatch(tournamentsError())
      });
   };
}

export function editTournament(id, name) {
  return function(dispatch) {
     return callTournamentServer('PATCH', {id: id, param: {"name": name} })
     .then(function(response) {
       if (!response.ok) {
         throw Error(response.statusText);
       }
       return response.json();
     }).then(function(response) {
       dispatch(fetchTournaments())
     }).catch(function(error) {
       alert('edit failed');
     });
  };
}

export function createTournament(name) {
  return function(dispatch) {
     return callTournamentServer('POST', { param: {"name": name} } )
     .then(function(response) {
       if (!response.ok) {
         throw Error(response.statusText);
       }
       return response.json();
     }).then(function(response) {
       dispatch(fetchTournaments())
     }).catch(function(error) {
       alert('create failed');
     });
  };
}

export function deleteTournament(id) {
  return function(dispatch) {
     return callTournamentServer('DELETE', {id: id})
     .then(function(response) {
       if (!response.ok) {
         throw Error(response.statusText);
       }
       return response.json();
     }).then(function(response) {
       dispatch(fetchTournaments())
     }).catch(function(error) {
       alert('delete failed');
     });
  };
}


export default store;
