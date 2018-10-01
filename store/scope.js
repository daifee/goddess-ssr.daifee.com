import createScopeGetState from './createScopeGetState';
import createScopeDispatch from './createScopeDispatch';
import createScopeModels from './createScopeModels';
import * as models from './models';


export const SCOPE = 'GLOBAL';
export const scopeModels = createScopeModels(models, SCOPE);
export const getScopeState = createScopeGetState(SCOPE);
export const scopeDispatch = createScopeDispatch(SCOPE);
