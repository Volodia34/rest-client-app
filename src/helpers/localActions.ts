export function saveToLocalStorage<T>(key: string, value: T): void {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Ошибка при парсинге JSON из localStorage:', error);
      return null;
    }
  }
  return null;
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
