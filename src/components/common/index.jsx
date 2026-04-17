import React from 'react';
import clsx from 'clsx';

/**
 * Button Component - Reusable button with multiple variants
 * @param {string} variant - 'primary', 'secondary', 'ghost'
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {boolean} isLoading - Shows loading state
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-purple-600',
    secondary: 'bg-secondary text-white hover:bg-pink-600',
    ghost: 'text-text hover:bg-dark-hover',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * Card Component - Container with consistent styling
 */
export const Card = ({
  children,
  className,
  hover = true,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'card p-4 md:p-6',
        hover && 'card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Input Component - Text input with consistent styling
 */
export const Input = ({
  label,
  error,
  icon: Icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
        )}
        <input
          className={clsx(
            'w-full px-4 py-2 bg-dark-hover text-text border border-dark-border rounded-lg',
            'outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50',
            'placeholder-text-secondary',
            Icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

/**
 * Badge Component - Small label/tag component
 */
export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
}) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={clsx('rounded-full font-medium', variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
};

/**
 * Modal Component - Reusable modal dialog
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`card w-full ${sizes[size]} animate-slide-up`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/**
 * Notification Component - Toast-like notifications
 */
export const Notification = ({
  message,
  type = 'info',
  onClose,
  autoClose = true,
}) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-primary',
  };

  return (
    <div className={clsx('text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up', colors[type])}>
      {message}
      <button onClick={onClose} className="ml-auto">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Import and re-export ThemeCustomizer components
export {
  ThemeCustomizer,
  ColorPalette,
  DesignSystemGuide,
  exportThemeAsCSS,
  downloadTheme,
} from './ThemeCustomizer';
