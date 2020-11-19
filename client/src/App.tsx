import React from 'react';
import ClientPage from './routes/client/index';
import './App.css';
import { Homepage } from './routes/home';
import NavigationBar from './routes/common/NavigationBar';
import { Admin } from './routes/admin';
import { Route, Switch } from 'react-router-dom';
import { sampleRecord } from './ExampleData';

function App() {
    return (
        <div className="App">
            <NavigationBar />
            <Switch>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/client">
                    <ClientPage />
                </Route>
                <Route path="/">
                    <Homepage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
