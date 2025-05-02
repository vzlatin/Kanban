export function validate(
  value: string,
  name: string,
): { isValid: boolean; errors: Record<string, string>[] } {
  const errors: Record<string, string>[] = [];

  switch (name) {
    case "first-name":
    case "last-name":
      return validateName(value, errors);
    case "email":
      return validateEmail(value, errors);
    case "password":
      return validatePassword(value, errors);
    default:
      return { isValid: false, errors: [] };
  }
}

function validateName(value: string, errors: Record<string, string>[]) {
  errors.length = 0;
  if (!value.trim()) {
    errors.push({
      error: "Field is required",
    });
  }
  if (value.length < 2) {
    errors.push({
      error: "Value must be at least 2 characters long",
    });
  }

  return { isValid: errors.length === 0, errors };
}

function validateEmail(value: string, errors: Record<string, string>[]) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  errors.length = 0;
  if (!value.trim()) {
    errors.push({
      error: "Field is required",
    });
  }
  if (!emailRegex.test(value)) {
    errors.push({
      error: "Invalid e-mail format",
    });
  }
  return { isValid: errors.length === 0, errors };
}

function validatePassword(value: string, errors: Record<string, string>[]) {
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(value)) {
    errors.push({
      error: "Password must contain at least one uppercase letter",
    });
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(value)) {
    errors.push({
      error: "Password must contain at least one lowercase letter",
    });
  }

  // Check for at least one number
  if (!/\d/.test(value)) {
    errors.push({
      error: "Password must contain at least one number",
    });
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+={}[\]:;"'<>?,./\\|`~-]/.test(value)) {
    errors.push({
      error: "Password must contain at least one special character",
    });
  }

  // Check for minimum length (8 characters)
  if (value.length < 8) {
    errors.push({
      error: "Password must be at least 8 characters long",
    });
  }
  return { isValid: errors.length === 0, errors };
}
