

// Imports
import React from "react";
import { Switch, Route } from 'react-router-dom'
import { 
  MainPage, ApplicationPage, DashboardPage, PageNotFound, TeamPage, rulesPage, FaqPage, PrivacyPage, StaffPage, ReviewPage, AppListPage, SupportPage, ContentCreatorPage,
  BanAppealPage, ArtPosterPage, StaffList 
} from './pages'


// Rendering of components
function App() {
  return (
    <Switch>
      <Route path="/" exact={ true }  component={MainPage} />
      <Route path="/team" exact={ true }  component={TeamPage} />
      <Route path="/rules" exact={ true }  component={rulesPage} />
      <Route path="/faq" exact={ true }  component={FaqPage} />
      {/*<Route path="/staff" exact={ true }  component={StaffList} />*/}
      <Route path="/privacy" exact={ true }  component={PrivacyPage} />
      <Route path="/dashboard" exact={ true }  component={DashboardPage} />
      <Route path="/applications" exact={ true }  component={ApplicationPage} />
      <Route path="/applications/staff" exact={ true }  component={StaffPage} />
      <Route path="/applications/support" exact={ true }  component={SupportPage} />
      <Route path="/applications/creator" exact={ true }  component={ContentCreatorPage} />
      <Route path="/applications/appeal" exact={ true }  component={BanAppealPage} />
      <Route path="/applications/art" exact={ true }  component={ArtPosterPage} />
      <Route path="/applications/review" exact={ true }  component={AppListPage } />
      <Route path="/applications/review/:id" component={ReviewPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
