import { Platform } from 'react-native';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './reducers/';

const logger = createLogger({collapsed: true});

const enhancer = compose(
    applyMiddleware(thunk, logger)
    // devTools({
    //     name: Platform.OS,
    //     hostname: 'localhost',
    //     port: 5678
    // })
);

export default function configureStore(initialState) {
    return createStore(
        combineReducers({ ...reducers }),
        initialState,
        enhancer
    );
}
