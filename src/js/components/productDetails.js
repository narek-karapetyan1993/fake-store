import { el, setChildren } from 'redom';
import { Router } from '../main.js';

export function productDetails(productId, products) {
  const product = products.find((element) => element.id == productId);

  const content = el(
    'div',
    {
      className: 'shadow-sm p-3 mb-5 bg-body rounded border border-dark h-75"',
    },
    'loading . . .'
  );

  content.innerHTML = '';

  setChildren(content, [
    el('h1', `Product details id ${productId}`),
    el(
      'div',
      {
        className: 'd-flex flex-column h-100 p-2 position-relative',
      },
      [
        el('img', {
          style: 'height: 500px;',
          className: 'w-50 mb-1 ',
          src: product.image,
          alt: product.title,
        }),
        el(
          'small',
          { className: 'text-start p-1 mb-2 fs-5 fw-bold' },
          `${product.price} $`
        ),
        el(
          'p',
          { className: 'text-start align-content-start' },
          product.category
        ),
        el('h2', { className: 'mb-1 h5 text-start mb-3' }, product.title),
        el('h4', { className: 'mb-1 h6 text-start mb-3' }, product.description),
        el('div.mt-auto.d-flex.justify-content-between', [
          el(
            'a',
            {
              href: `/product/${product.id}/buy`,
              className: 'btn btn-warning  w-25 fw-bold',
              onclick(event) {
                event.preventDefault();
                Router.navigate(event.target.getAttribute('href'));
                Router.document.body.classList.add('stop');
              },
              style: 'z-index: 200;',
            },
            'Buy'
          ),
          el(
            'a',
            {
              className: 'btn btn-primary w-25 fw-bold',
              href: '/',
              onclick(event) {
                event.preventDefault();
                Router.navigate(event.target.getAttribute('href'));
              },
            },
            'Back to list'
          ),
        ]),
      ]
    ),
  ]);

  return el('div', { className: 'container pt-5' }, [content]);
}
