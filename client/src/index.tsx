import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Grommet } from 'grommet';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { Provider } from 'react-redux';
import { rootReducer } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { apiMiddleware } from './store/api';

const customBreakpoints = {
    global: {
        breakpoints: {
            small: {
                value: 568,
                edgeSize: {
                    none: '0px',
                    small: '6px',
                    medium: '12px',
                    large: '24px',
                },
            },
            medium: {
                value: 1100,
                edgeSize: {
                    none: '0px',
                    small: '12px',
                    medium: '24px',
                    large: '48px',
                },
            },
            large: {
                value: 1600,
                edgeSize: {
                    none: '0px',
                    small: '12px',
                    medium: '24px',
                    large: '48px',
                },
            },
        },
    },
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, apiMiddleware, loggerMiddleware))
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Grommet theme={customBreakpoints} full>
                    <App />
                </Grommet>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
