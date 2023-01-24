import Navigo from 'navigo';
import { el, setChildren, mount } from 'redom';
import { header } from './components/header.js';
import '../scss/style.scss';
import getProducts from './components/api.js';

export const Router = new Navigo('/');

async function getComponent(component) {
  return await import(`${component}`);
}

(async function app() {
  const products = await getProducts();

  const main = el('main.bg-secondary.bg-opacity-25');

  setChildren(window.document.body, [header(), main]);

  Router.on('/', () => {
    getComponent('./components/productList.js').then((component) => {
      setChildren(main, component.productList(products));
    });
  });

  Router.on('/product/:id', ({ data: { id } }) => {
    getComponent('./components/productDetails.js').then((component) => {
      setChildren(main, component.productDetails(id, products));
    });
  });

  Router.on('/product/:id/buy', () => {
    getComponent('./components/paymentModal.js').then((component) => {
      mount(main, component.paymentModal());
    });
  });

  Router.resolve();
})();
