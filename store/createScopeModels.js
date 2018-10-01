

export function createScopeModelName(modelName, scope) {
  return `${scope}@${modelName}`;
}

export function extractModelName(scopeModelName, scope) {
  const snippets = scopeModelName.split('@');
  return snippets[0] === scope ? snippets[1] : '';
}


function createScopeModels(models, scope) {
  const scopeModels = {};
  Object.keys(models).forEach((modelName) => {
    const scopeModelName = createScopeModelName(modelName, scope);
    scopeModels[scopeModelName] = models[modelName];
  });

  return scopeModels;
}
export default createScopeModels;
