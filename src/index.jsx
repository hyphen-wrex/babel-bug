import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import config, { af } from './config';

console.log('config', config);
const { KEY } = config;
console.log(KEY);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }
  console.log('Looks like we are in development mode!');
}

const ab = { a: 'a', b: 'b' };
function getD() {
  return {
    ...ab,
    c: 'c',
  };
}

const getB = async function () {
  return {};
};

const main = async function () {
  await getB();
};

af();
main();

const d = getD();
const { a, b, c } = d;
console.log('a, b, c', a, b, c);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
);
const store = createStore(() => {}, enhancer);

class Root extends React.Component {
  render() {
    return <Provider store={this.props.store}>
      <div>Hello world</div>
    </Provider>;
  }
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
