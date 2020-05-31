import { ofType } from 'redux-observable';
import { tournamentsReceived, tournamentsError } from '../actions/tournaments';

function fetchTournamentsFromServer() {
    return fetch('http://localhost:4000/tournaments');
}

function fetchTournaments() {
    return function(dispatch) {
        return fetchTournamentsFromServer().then(
        (payload) => dispatch(tournamentsReceived(payload)),
        (error) => dispatch(tournamentsError)
        );
    };
}