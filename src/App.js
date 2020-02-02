import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import authentication from '@kdpw/msal-b2c-react';

import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/homepage';
import ClaimsPage from './pages/claimspage';
import WeatherPage from './pages/weatherpage';
import ProfilePage from  './pages/profilepage';
import RunningPage from './pages/runningpage';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container fluid={true}>
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/claims" component={ClaimsPage} />
          <Route path="/weather" component={WeatherPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/training/running" component={RunningPage} />
          <Route path="*" component={() => {return "404 NOT FOUND"}} />
        </Switch>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;