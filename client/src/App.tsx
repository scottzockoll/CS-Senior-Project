import React from 'react';
import ClientPage from './routes/client/index';
import './App.css';
import Homepage from './routes/home/index';
import NavigationBar from './routes/common/NavigationBar';
import { Admin } from './routes/admin';
import { Route, Switch } from 'react-router-dom';
import { sampleRecord } from './ExampleData';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/admin">
                    <NavigationBar />
                    <Admin />
                </Route>
                <Route path="/client">
                    <NavigationBar />
                    <ClientPage userRecord={sampleRecord} />
                </Route>
                <Route path="/">
                    <NavigationBar />
                    <Homepage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
