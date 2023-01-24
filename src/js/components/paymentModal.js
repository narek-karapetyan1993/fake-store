// import cardValidator from 'card-validator';
import { el, mount } from 'redom';
import Inputmask from 'inputmask';
import { Router } from '../main.js';
import {
  validateCVV,
  validateDate,
  validateNumber,
  validateEmail,
} from './validations.js';

export function paymentModal() {
  let cardValid = false;
  let dateValid = false;
  let cvvValid = false;
  let emailValid = false;

  const icons = {
    mir: '<svg xmlns="http://www.w3.org/2000/svg" height="47" width="100"  viewBox="132.448 288.608 999 219.776"><path fill="#4DB45E" d="M461.664 288.608v.096c-.096 0-30.336-.096-38.4 28.8-7.392 26.496-28.224 99.616-28.8 101.632h-5.76s-21.312-74.752-28.8-101.728c-8.064-28.896-38.4-28.8-38.4-28.8h-69.056v219.776h69.088V377.855h5.76l40.32 130.528h47.968l40.32-130.432h5.76v130.432h69.088V288.608h-69.088zM714.048 288.608s-20.256 1.824-29.76 23.041L635.36 419.136h-5.76V288.608h-69.088v219.776h65.248s21.216-1.92 30.721-23.04l47.968-107.488h5.76v130.528h69.088V288.608h-65.249zM810.016 388.416v119.968h69.088v-70.048h74.849c32.64 0 60.256-20.832 70.528-49.888H810.016v-.032z"/><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="1065.561" y1="-978.524" x2="1779.66" y2="-978.524" gradientTransform="matrix(.32 0 0 .32 459.34 646.84)"><stop offset=".3" stop-color="#00b4e6"/><stop offset="1" stop-color="#088ccb"/></linearGradient><path fill="url(#a)" d="M953.984 288.608H800.32c7.68 41.856 39.071 75.424 79.647 86.368a110.449 110.449 0 0 0 28.896 3.841h118.432c1.056-4.992 1.536-10.08 1.536-15.36.001-41.345-33.503-74.849-74.847-74.849z"/></svg>',
    mastercard:
      '<svg xmlns="http://www.w3.org/2000/svg" height="47" width="100" id="svg895" version="1.1" viewBox="-96 -98.908 832 593.448"><defs id="defs879"><style id="style877" type="text/css">.e{fill:#f79e1b}</style></defs><path id="rect887" display="inline" fill="#ff5f00" stroke-width="5.494" d="M224.833 42.298h190.416v311.005H224.833z"/><path id="path889" d="M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z" fill="#eb001b" stroke-width="5.494"/><path id="path891" d="M621.101 320.394v-6.372h2.747v-1.319h-6.537v1.319h2.582v6.373zm12.691 0v-7.69h-1.978l-2.307 5.493-2.308-5.494h-1.977v7.691h1.428v-5.823l2.143 5h1.483l2.143-5v5.823z" class="e" fill="#f79e1b" stroke-width="5.494"/><path id="path893" d="M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z" class="e" fill="#f79e1b" stroke-width="5.494"/></svg>',
    visa: '<svg xmlns="http://www.w3.org/2000/svg" height="47" width="100" viewBox="-74.7 -40.204 800.4 241.224"><defs><linearGradient x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="scale(89.72793 -89.72793) rotate(-20.218 .966 -.457)" spreadMethod="pad" id="b"><stop offset="0" stop-color="#222357"/><stop offset="1" stop-color="#254aa5"/></linearGradient><clipPath clipPathUnits="userSpaceOnUse" id="a"><path d="M413.742 90.435c-.057-4.494 4.005-7.002 7.065-8.493 3.144-1.53 4.2-2.511 4.188-3.879-.024-2.094-2.508-3.018-4.833-3.054-4.056-.063-6.414 1.095-8.289 1.971l-1.461-6.837c1.881-.867 5.364-1.623 8.976-1.656 8.478 0 14.025 4.185 14.055 10.674.033 8.235-11.391 8.691-11.313 12.372.027 1.116 1.092 2.307 3.426 2.61 1.155.153 4.344.27 7.959-1.395l1.419 6.615c-1.944.708-4.443 1.386-7.554 1.386-7.98 0-13.593-4.242-13.638-10.314m34.827 9.744c-1.548 0-2.853-.903-3.435-2.289l-12.111-28.917h8.472l1.686 4.659h10.353l.978-4.659h7.467l-6.516 31.206h-6.894m1.185-8.43l2.445-11.718h-6.696l4.251 11.718m-46.284 8.43l-6.678-31.206h8.073l6.675 31.206h-8.07m-11.943 0l-8.403-21.24-3.399 18.06c-.399 2.016-1.974 3.18-3.723 3.18h-13.737l-.192-.906c2.82-.612 6.024-1.599 7.965-2.655 1.188-.645 1.527-1.209 1.917-2.742l6.438-24.903h8.532l13.08 31.206h-8.478"/></clipPath></defs><g clip-path="url(#a)" transform="matrix(4.98469 0 0 -4.98469 -1804.82 502.202)"><path d="M0 0l98.437 36.252 22.394-60.809-98.436-36.252" fill="url(#b)" transform="translate(351.611 96.896)"/></g></svg>',
  };

  function activateSubmitButton() {
    const submitButton = document.getElementById('payBtn');
    submitButton.disabled = !(cardValid && dateValid && cvvValid && emailValid);
  }

  function numberHandler(element) {
    const numberMask = new Inputmask({
      mask: '9999 9999 9999 9999 [99]',
      greedy: false,
    });
    numberMask.mask(element);

    element.addEventListener('blur', () => {
      cardValid = false;
      const numberValidation = validateNumber(element.value);

      if (!numberValidation.isPotentiallyValid) {
        element.classList.add('border-danger');
        activateSubmitButton();
        return;
      }

      if (numberValidation.card) {
        const cardType = numberValidation.card.type;
        const cardNumber = document.getElementById('cardNumber');

        cardNumber.innerHTML = '';

        if (icons[cardType]) {
          mount(
            cardNumber,
            el('span.h-100.w-100', {
              backgroundImage: `url(${icons[cardType]})`,
              innerHTML: icons[cardType],
            })
          );
        }

        cardValid = true;
        activateSubmitButton();
      }
    });

    element.addEventListener('input', () => {
      element.classList.remove('border-danger');
    });
  }

  function dateHandler(element) {
    const dateMask = new Inputmask({
      mask: '99/99',
    });
    dateMask.mask(element);

    element.addEventListener('blur', () => {
      dateValid = false;
      const dateValidation = validateDate(element.value, 4);

      if (!dateValidation.isValid) {
        element.classList.add('border-danger');
        activateSubmitButton();
      } else {
        dateValid = true;
        activateSubmitButton();
      }
    });

    element.addEventListener('input', () => {
      element.classList.remove('border-danger');
    });
  }

  function CVCHandler(element) {
    const CVCMask = new Inputmask({
      mask: '999',
    });
    CVCMask.mask(element);

    element.addEventListener('blur', () => {
      cvvValid = false;
      const CVCValidation = validateCVV(element.value);

      if (!CVCValidation.isValid) {
        element.classList.add('border-danger');
        activateSubmitButton();
      } else {
        cvvValid = true;
        activateSubmitButton();
      }
    });

    element.addEventListener('input', () => {
      element.classList.remove('border-danger');
    });
  }

  function EmailHandler(element) {
    const EmailMask = new Inputmask({
      mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
      onBeforePaste(pastedValue) {
        const replaceValue = pastedValue.toLowerCase();
        return replaceValue.replace('mailto:', '');
      },
    });
    EmailMask.mask(element);

    element.addEventListener('blur', () => {
      emailValid = false;
      const emailValidation = validateEmail(element.value);

      if (!emailValidation) {
        element.classList.add('border-danger');
        activateSubmitButton();
      } else {
        emailValid = true;
        activateSubmitButton();
      }
    });

    element.addEventListener('input', () => {
      element.classList.remove('border-danger');
    });
  }

  return el(
    'div#paymentModal',
    {
      className: 'modal d-block',
      style:
        'background-color: rgba(0,0,0,0.5); height: 120%; overflow-y: scroll;',
      onclick(event) {
        if (event._isClickWithinModal) return;
        Router.navigate('/', { historyAPIMethod: 'replaceState' });
        document.body.classList.remove('stop');
      },
    },
    el(
      'div.modal-dialog',
      {
        onclick(event) {
          event._isClickWithinModal = true;
        },
      },
      el('div.modal-content.p-3', [
        el('div.modal-header', [
          el('h3.modal-title', 'Add credit card'),
          el('button.btn-close', {
            type: 'button',
            onclick(event) {
              event.preventDefault();
              Router.navigate('/');
              document.body.classList.remove('stop');
            },
          }),
        ]),
        el(
          'form.g-3.d-flex.flex-wrap',
          el('div.form-row.w-100', [
            el(
              'label.form-label.w-75',
              'Card number',
              el('input.form-control', numberHandler, {
                required: true,
                placeholder: 'Card number',
              })
            ),
            el('span#cardNumber'),
          ]),
          el(
            'div.form-row.w-50',
            el(
              'label.form-label.w-75',
              'Card date',
              el('input.form-control.', dateHandler, {
                required: true,
                placeholder: 'MM/YY',
              })
            )
          ),
          el(
            'div.form-row.w-50',
            el(
              'label.form-label.w-75',
              'CVV/CVC',
              el('input.form-control.', CVCHandler, {
                required: true,
                placeholder: 'CVV/CVC',
              })
            )
          ),
          el(
            'div.form-row.w-75.mb-4',
            el(
              'label.form-label.w-100',
              'Email for check',
              el('input.form-control.', EmailHandler, {
                required: true,
                placeholder: 'Email',
              })
            )
          ),
          el(
            'div.form-row.w-50.ms-auto',
            el('button.btn.btn-primary.w-100#payBtn', { disabled: true }, 'Pay')
          )
        ),
      ])
    )
  );
}
