import cardValidator from 'card-validator';
import IsEmail from 'isemail';

export function validateNumber(value) {
  return cardValidator.number(value);
}

export function validateDate(value, maxElapsedYear) {
  return cardValidator.expirationDate(value, maxElapsedYear);
}

export function validateCVV(value) {
  return cardValidator.cvv(value);
}

export function validateEmail(value) {
  return IsEmail.validate(value);
}
