import { el, setChildren } from 'redom';
import { Router } from '../main.js';

export function productList(products) {
  const content = el(
    'div#content',
    { className: 'text-center' },
    'loading . . .'
  );
  const list = el('ul', {
    className:
      'list-group d-flex flex-row flex-wrap align-content-end justify-content-between',
  });

  setChildren(
    list,
    products.map((product) =>
      el(
        'li',
        {
          style: { width: '19%' },
          className: 'list-group-item mb-4 p-0 rounded',
        },
        el(
          'div',
          {
            className: 'd-flex flex-column h-100 p-2 position-relative',
          },
          [
            el('a', {
              href: `/product/${product.id}`,
              onclick(event) {
                event.preventDefault();
                window.scrollTo(0, 0);
                Router.navigate(event.target.getAttribute('href'));
              },
              className: 'h-100 w-100 position-absolute',
              style: 'z-index: 100;',
            }),
            el('img', {
              style: 'height: 250px;',
              className: 'w-100 mb-1 ',
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

            el(
              'a',
              {
                href: `/product/${product.id}/buy`,
                className: 'btn btn-warning mt-auto w-75 fw-bold',
                onclick(event) {
                  event.preventDefault();
                  Router.navigate(event.target.getAttribute('href'));
                  document.body.classList.add('stop');
                },
                style: 'z-index: 200;',
              },
              'Buy'
            ),
          ]
        )
      )
    )
  );

  content.innerHTML = '';
  setChildren(content, list);
  // })
  // .catch(console.error());

  return el('div', { className: 'container pt-5' }, content);
}
