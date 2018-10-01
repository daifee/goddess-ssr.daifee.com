
import { extractModelName } from './createScopeModels';

function createScopeGetState(scope) {
  return function scopeGetState(rootState = {}) {
    const state = rootState;

    const scopeState = {};
    Object.keys(state).forEach((key) => {
      const modelName = extractModelName(key, scope);
      if (modelName) {
        scopeState[modelName] = state[key];
      }
    });

    return scopeState;
  };
}

export default createScopeGetState;
