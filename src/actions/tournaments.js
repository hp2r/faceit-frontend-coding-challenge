export const TOURNAMENTS_ERROR = 'TOURNAMENTS_ERROR';
export const TOURNAMENTS_RECEIVED = 'TOURNAMENTS_RECEIVED';
export const EDIT_TOUNRAMENT = 'EDIT_TOURNAMENT';
export const DELETE_TOURNAMENT = 'DELETE_TOURNAMENT';


export function tournamentsError() {
    return {type: TOURNAMENTS_ERROR }
}

export function tournamentsReceived(tournamentsData) {
    return {
        type: TOURNAMENTS_RECEIVED, payload: {
            tournaments: tournamentsData
        }
    }
}

export function editTournament(id) {
        return {type: EDIT_TOUNRAMENT, payload: {
            tournamentId: id
        } 
    }
}

export function deleteTournament(id) {
        return {type: DELETE_TOURNAMENT, payload: {
            tournamentId: id
        } 
    }
}
