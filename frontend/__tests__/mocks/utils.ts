export const API_BASE_URL = 'http://localhost:5700';

export const apiUrl = (path: string) => {
  return `${API_BASE_URL}${path}`;
};
export const privateUrl = (path: string) => {
  return `${API_BASE_URL}/private${path}`;
};
