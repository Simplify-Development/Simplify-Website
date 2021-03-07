

// Imports
import React from "react";
import { Switch, Route } from 'react-router-dom'
import { MainPage, ApplicationPage, DashboardPage, PageNotFound, TeamPage, rulesPage, FaqPage, PrivacyPage } from './pages'


// Rendering of components
function App() {
  return (
    <Switch>
      <Route path="/" exact={ true }  component={MainPage} />
      <Route path="/team" exact={ true }  component={TeamPage} />
      <Route path="/rules" exact={ true }  component={rulesPage} />
      <Route path="/faq" exact={ true }  component={FaqPage} />
      <Route path="/privacy" exact={ true }  component={PrivacyPage} />
      <Route path="/dashboard" exact={ true }  component={DashboardPage} />
      <Route path="/applications" exact={ true }  component={ApplicationPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
