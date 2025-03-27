export const validateEmail = (email: string): boolean => {
  return Boolean(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
}

export const validateMinLength = (value: string, minLength = 6): boolean => {
  return value.trim().length >= minLength;
}