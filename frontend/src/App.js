

// Imports
import React from "react";
import { Switch, Route } from 'react-router-dom'
import { MainPage, ApplicationPage, DashboardPage, PageNotFound } from './pages'


// Rendering of components
function App() {
  return (
    <Switch>
      <Route path="/" exact={ true }  component={MainPage} />
      <Route path="/dashboard" exact={ true }  component={DashboardPage} />
      <Route path="/dashboard/applications" exact={ true }  component={ApplicationPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
