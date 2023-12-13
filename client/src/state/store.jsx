// redux/store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducer'; // Create this file

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
