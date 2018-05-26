import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';

import PatientsContainer from './pages/PatientsContainer';
import PatientContainer from './pages/PatientContainer';
import AppointmentsContainer from './pages/AppointmentsContainer';

const StyledNavItem = styled.h3`
  display: inline-block;
  margin-left: 40px;
  margin-top: 15px;
`

const StyledLink = styled(Link) `
  text-decoration: none;
  color: black;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const StyledNavBar = styled.div`
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid #72c6a5;
`

const Routes = () => (
  <Router>
    <div>
      <StyledNavBar>
        <StyledLink to="/patients">
          <StyledNavItem>Patients</StyledNavItem>
        </StyledLink>
        <StyledLink to="/appointments">
          <StyledNavItem>Appointments</StyledNavItem>
        </StyledLink>
      </StyledNavBar>

      <Route path="/" component={PatientsContainer} />
      <Route path="/patients" component={PatientsContainer} />
      <Route path="/patient/:id" component={PatientContainer} />
      <Route path="/appointments" component={AppointmentsContainer} />
    </div>
  </Router>
)

export default Routes;
