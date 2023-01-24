import { validateCVV } from '../src/js/components/validations';

describe('validate CVV', () => {
  test('correct CVV', () => {
    const validCVV = ['111', '548', '567', '853', '344', '344'];
    for (const cvv of validCVV) {
      expect(validateCVV(cvv).isValid).toBe(true);
    }
  });

  test('uncorrected CVV', () => {
    const invalidCVV = [' //', '///', 'sss', 'hgf', 'dv  ', 'f%6', '   '];
    for (const cvv of invalidCVV) {
      expect(validateCVV(cvv).isValid).toBe(false);
    }
  });

  test('too short CVV', () => {
    const shortCVV = ['1', '0', '12', '55'];
    for (const cvv of shortCVV) {
      expect(validateCVV(cvv).isValid).toBe(false);
    }
  });

  test('too long CVV', () => {
    const longCVV = ['11111', '02323', '5533'];
    for (const cvv of longCVV) {
      expect(validateCVV(cvv).isValid).toBe(false);
    }
  });
});
