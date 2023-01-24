import { paymentModal } from '../src/js/components/paymentModal';

describe('payment modal', () => {
  let modal;
  beforeEach(() => {
    modal = paymentModal();
  });

  test('modal is DOMElement', () => {
    expect(modal instanceof HTMLElement).toBe(true);
  });

  test('inside modal 4 inputs', () => {
    const inputs = modal.querySelectorAll('input');

    expect(inputs.length === 4).toBe(true);
  });

  test('inputs have correct placeholders', () => {
    const inputs = modal.querySelectorAll('input');

    expect(inputs[0].placeholder === 'Card number').toBe(true);
    expect(inputs[1].placeholder === 'MM/YY').toBe(true);
    expect(inputs[2].placeholder === 'CVV/CVC').toBe(true);
    expect(inputs[3].placeholder === 'Email').toBe(true);
  });
});
