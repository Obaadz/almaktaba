import { ValidationError } from "class-validator";

export const getValidationErrorMessage = (errors: ValidationError[]): string => {
  const messages = errors.map((error) => {
    return Object.values(error.constraints).join(', ');
  });

  return messages.join(', ');
}