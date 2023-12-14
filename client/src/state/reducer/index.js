// redux/reducers/index.js
import { combineReducers } from 'redux';
import { BlogReducer } from './slices/BlogReducer';
import { AuthReducer } from './slices/AuthReducer';
import { RenderModalReducer } from './slices/RenderModalReducer';
import { ProblemRenderReducer } from './slices/ProblemRenderReducer';





const rootReducer = combineReducers({

    BlogReducer,
    AuthReducer,
    RenderModalReducer,
    ProblemRenderReducer
});

export default rootReducer;
