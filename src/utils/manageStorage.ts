export function removeLocalStorage(key: string) {
  if (!key) return;
  localStorage.removeItem(key);
}
