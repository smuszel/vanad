import Main from './Main';
import React from 'react';
import ReactDOM, { render } from 'react-dom';

window['React'] = React;
window['ReactDOM'] = ReactDOM;

const container = document.createElement('div');
render(<Main />, container);
document.body.appendChild(container);
