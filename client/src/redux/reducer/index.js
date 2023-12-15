// redux/reducers/index.js
import { combineReducers } from 'redux';
import { BlogReducer } from './slices/BlogReducer';
import { AuthReducer } from './slices/AuthReducer';
import { ProblemRenderReducer } from './slices/ProblemRenderReducer';
import { RenderSelectedProblem } from './slices/RenderSelectedProblem';
import { FetchSubmissionReducer } from './slices/FetchSubmissionReducer';




const rootReducer = combineReducers({

    BlogReducer,
    AuthReducer,
    ProblemRenderReducer,
    RenderSelectedProblem,
    FetchSubmissionReducer

});

export default rootReducer;
