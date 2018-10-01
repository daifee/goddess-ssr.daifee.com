/**
 * 异步存储
 * 支持存储object
 */


function getStorage() {
  return window.localStorage;
}

export async function getItem(key) {
  const storage = getStorage();
  let value = storage.getItem(key);
  try {
    value = JSON.parse(value);
  } catch (error) {
    // ignore
  }
  return value;
}

export async function setItem(key, value) {
  const storage = getStorage();
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  return storage.setItem(key, value);
}

export async function remoteItem(key) {
  const storage = getStorage();
  return storage.removeItem(key);
}
