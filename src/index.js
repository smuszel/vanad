import S3 from './Select3';
import React from 'react';
import ReactDOM, { render } from 'react-dom';

window['React'] = React;
window['ReactDOM'] = ReactDOM;

const container = document.createElement('div');
render(<S3 />, container);
document.body.appendChild(container);
