import { el } from 'redom';
import logo from '../../assets/images/logo.png';
import '../../scss/header.scss';
import { Router } from '../main.js';

export function header() {
  return el('header', { className: 'page-header', style: { height: '80px' } }, [
    el(
      'div',
      el(
        'a.d-flex.align-items-center.page-header-text',
        {
          href: '/',
          onclick(event) {
            event.preventDefault();
            Router.navigate(event.target.getAttribute('href'));
          },
        },
        'Fake Store',
        el('img', { className: 'page-header-logo', src: logo })
      )
    ),
  ]);
}
