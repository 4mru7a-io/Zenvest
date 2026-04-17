import React, { useEffect } from 'react';
import { useAuthStore } from '../stores';

/**
 * useAuth - Custom hook for authentication
 */
export const useAuth = () => {
  const { user, isLoading, error, setUser, logout } = useAuthStore();

  return {
    user,
    isLoading,
    error,
    setUser,
    logout,
    isAuthenticated: !!user,
  };
};

/**
 * useLocalStorage - Persist state to localStorage
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

/**
 * usePrevious - Get previous value of a prop/state
 */
export const usePrevious = (value) => {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/**
 * useDebounce - Debounce a value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * useMediaQuery - Check if media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  React.useEffect(() => {
    const mediaQL = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mediaQL.addListener(handler);

    return () => mediaQL.removeListener(handler);
  }, [query]);

  return matches;
};

/**
 * useAsync - Handle async operations
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = React.useState('idle');
  const [value, setValue] = React.useState(null);
  const [error, setError] = React.useState(null);

  const execute = React.useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error);
      setStatus('error');
    }
  }, [asyncFunction]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};
