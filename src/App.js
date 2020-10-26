import React from 'react';
import './App.css';
import Home from './containers/Home/Home';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import gameMechanics from './store/reducers/gameMechanics';

const rootReducer = combineReducers({
    gameMechanics
});

export const store = createStore(rootReducer, (
    applyMiddleware()
));

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Home/>
            </Provider>
        </div>
    );
}

export default App;
