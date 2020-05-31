import { fromJS } from 'immutable';

const initialState = false;

const typeMap = fromJS({
  TOURNAMENTS_ERROR: state => true
})

export default (state = initialState, {type}) => {
  return typeMap.get(type, s => s)(state);
}