export function storeToLocalstorage<T>(key: string, data: T[]): void {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Store to Localstorage Error:', error);
  }
}

export function getFromLocalstorage<T>(key: string): T[] {
  try {
    const jsonData = localStorage.getItem(key);
    if (jsonData) {
        return JSON.parse(jsonData);
    }
    return [];
  } catch (error) {
    console.error('Get from Localstorage Error:', error);
    return [];
  }
}

export function getResultsItemById(key: string, id: string): ResultsItem | null {
  try {
    const data = getFromLocalstorage<ResultsItem>(key);
    const dataWithId = data.find((data: ResultsItem) => data.fsq_id === id);
    return dataWithId || null;
  } catch (error) {
    console.error('Get from Localstorage by Id Error:', error);
    return null;
  }
}

export function clearFromLocalstorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Clear from Localstorage Error:', error);
  }
}