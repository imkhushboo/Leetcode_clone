// redux/store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducer'; // Create this file
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
  ));

const persistor = persistStore(store);

export { store, persistor };

