import { fromJS } from 'immutable';

const initialState = {};

const typeMap = fromJS({
  TOURNAMENTS_RECEIVED: (state, payload) => {
    return fromJS(payload.tournaments);
  }
})

export default (state = initialState, {type, payload}) => {
  return typeMap.get(type, s => s)(state, payload);
}