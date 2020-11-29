import React from 'react';
import ClientPage from './routes/client/index';
import './App.css';
import { Homepage } from './routes/home';
import NavigationBar from './routes/common/NavigationBar';
import { Admin } from './routes/admin';
import { Route, Switch } from 'react-router-dom';
import { Box } from 'grommet';
import { MovieModal } from './routes/home/MovieModal';

function App() {
    return (
        <Box className="App">
            <NavigationBar />
            <MovieModal />
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
        </Box>
    );
}

export default App;
