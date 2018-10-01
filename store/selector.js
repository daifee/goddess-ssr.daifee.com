
import {getScopeState} from './scope';


export function user(rootState) {
  const state = getScopeState(rootState);
  return state.me.data;
}
