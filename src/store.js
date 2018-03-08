import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';

import reducer from './reducers/reducer.js';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

export default store;
