import { validateNumber } from '../src/js/components/validations';

describe('validate card number', () => {
  test('correct cardNumber', () => {
    const validCardNumbers = [
      '4012888888881881',
      '6288997715452584',
      '6282001509099283',
      '4111-1111-1111-1111',
      '4111 1111 1111 1111',
      '601 1 1 1  1 1 1 1   1 1 1 1 1 7',
      '378282246310005',
      '6212345678901232',
    ];
    for (const cardNumber of validCardNumbers) {
      expect(validateNumber(cardNumber).isValid).toBe(true);
    }
  });

  test('uncorrected cardNumber', () => {
    const invalidCardNumbers = [
      '220066666666666a',
      '2200666a66666666',
      '2200666a66666666',
      '22я00666a66я6666',
      '22я0_066@6a66я66',
      '20>666a66яю.6666',
      '200666a66яю.6666',
      '200666a66яю.6666,',
    ];
    for (const cardNumber of invalidCardNumbers) {
      expect(validateNumber(cardNumber).isValid).toBe(false);
    }
  });

  test('too short cardNumber', () => {
    const tooShortCardNumbers = [
      '262626226',
      '454544',
      '1',
      '',
      '9782598634561',
      '68924575786',
      '3',
      '0',
    ];
    for (const cardNumber of tooShortCardNumbers) {
      expect(validateNumber(cardNumber).isValid).toBe(false);
    }
  });

  test('too long cardNumber', () => {
    expect(validateNumber('2200666666666666666666666666').isValid).toBe(false);
  });
});
