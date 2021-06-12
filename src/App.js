import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

function App() {
  return (
    <AuthWrapper>

      <Router>
        <Switch>

        <PrivateRoute path="/" exact={true}>
          <Dashboard></Dashboard>  
        </PrivateRoute>
        
        <Route path="/login" exact>
          <Login />
        </Route>

        <Route  >
          <Error />
        </Route>

        </Switch>

      </Router>
    </AuthWrapper>

  );
}

export default App;
