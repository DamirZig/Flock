const API_URL = 'http://localhost:8000';

export interface User {
  email: string;
  password?: string;
  full_name?: string;
  role?: string;
  hashed_password?: string; // Included in backend model often
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Generic request helper to handle fetch, headers, and errors
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  } as HeadersInit;

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Essential for sending/receiving cookies across origins if needed (or same origin)
  };

  let response: Response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, config);
  } catch (error) {
    console.error(`Network error at ${endpoint}:`, error);
    throw new Error('Не удалось подключиться к серверу. Проверьте соединение.');
  }

  if (!response.ok) {
    let errorMessage = 'Произошла ошибка';
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      // Response is not JSON or empty
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export const registerUser = (user: User) => {
  return request<User>('/register', {
    method: 'POST',
    body: JSON.stringify(user),
  });
};

export const loginUser = (user: User) => {
  return request<AuthResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(user),
  });
};

export const logoutUser = () => {
  return request<{ message: string }>('/logout', {
    method: 'POST',
  });
};

export const getMe = () => {
  return request<User>('/users/me', {
    method: 'GET',
  });
};

