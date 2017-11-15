import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppContainer } from "react-hot-loader";

import reducer from './reducer';
import rootSaga from './actions';
import App from './App';


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

const rootEl = document.getElementById("root");

const action = (type: any, payload = {}) => store.dispatch({ type, ...payload })

const render = () => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootEl
)

if (module.hot) {
  console.log("hot!");
  module.hot.accept('./App', () => {
    console.log('doing an accept')
    const NextApp = require<RequireImport>('./App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootEl
    )
  });
}

render()
