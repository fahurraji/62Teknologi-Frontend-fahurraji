//import react
import React from 'react';

//import react router dom
import { Switch, Route } from "react-router-dom";

//import component Register
import Register from './pages/Register';

//import component Login
import Login from './pages/Login';

//import component Register
import Dashboard from './pages/Dashboard';
import Bussiness from './pages/Bussiness';
import Detail from './pages/Detail';
import Review from './pages/Review';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/bussiness" component={Bussiness} />
        <Route path="/bussiness/:id"><Detail /></Route>
        <Route path="/review/:id"><Review /></Route>
      </Switch>
    </div>
  );
}

export default App;