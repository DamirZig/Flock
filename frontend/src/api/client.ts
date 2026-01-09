const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface User {
  email: string;
  password?: string;
  full_name?: string;
  role?: string;
  hashed_password?: string;
  remember_me?: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Generic request helper to handle fetch, headers, and errors
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  } as HeadersInit;

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
    signal: controller.signal,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    clearTimeout(timeoutId);

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
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Сервер не отвечает. Превышено время ожидания.');
    }
    if (error instanceof Error) throw error;
    throw new Error('Не удалось подключиться к серверу. Проверьте соединение.');
  }
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
export const verifyPassword = (password: string) => {
  return request<{ status: string; message: string }>('/admin/verify-password', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
};
