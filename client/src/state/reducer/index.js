// redux/reducers/index.js
import { combineReducers } from 'redux';
import { BlogReducer } from './slices/BlogReducer';
import { AuthReducer } from './slices/AuthReducer';
import { RenderModalReducer } from './slices/RenderModalReducer';




const rootReducer = combineReducers({

    BlogReducer,
    AuthReducer,
    RenderModalReducer
});

export default rootReducer;
