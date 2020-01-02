import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reduxThunk from "redux-thunk";
import appReducer from './rootReducer';
import rootSaga from './rootSaga';
import startsWith from 'lodash/startsWith';


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

//if (!__PRODUCTION__) {
    const logger = createLogger({
        collapsed: true,
        predicate: (getState, action) => !startsWith(action.type, '@@redux-form'),
    });
    middlewares.push(logger);
//}

const configureStore = () => {
    const rootReducer = combineReducers({
        app: appReducer,
    });
    middlewares.push(reduxThunk);
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middlewares),
    );

    sagaMiddleware.run(rootSaga);
    return store;
};

const store = configureStore();
export default store;
