
const API_BASE_URL = "https://quantam-backend.onrender.com/api/test"

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Add any standard headers here, like Authorization
    // 'Authorization': `Bearer ${getAuthToken()}`
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      // Attempt to parse error response from the body
      const errorBody = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error('API Request Failed:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

export function get(endpoint: string, options?: RequestInit) {
  return request(endpoint, { ...options, method: 'GET' });
}

export function post(endpoint: string, body: any, options?: RequestInit) {
  return request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
}

export function patchRequest(endpoint: string, body: any, options?: RequestInit) {
  return request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) });
}

export function deleteRequest(endpoint: string, options?: RequestInit) {
  return request(endpoint, { ...options, method: 'DELETE' });
}

