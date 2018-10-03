
import createScopeModels from '../../../store/createScopeModels';
import createScopeDispatch from '../../../store/createScopeDispatch';
import createScopeGetState from '../../../store/createScopeGetState';
import * as models from './models';


const SCOPE = 'USER_BLOG_LIST';

export const scopeModels = createScopeModels(models, SCOPE);
export const dispatch = createScopeDispatch(SCOPE);
export const getState = createScopeGetState(SCOPE);


