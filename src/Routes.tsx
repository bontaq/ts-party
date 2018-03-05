import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';

import PatientsContainer from './PatientsContainer';
import PatientContainer from './pages/PatientContainer';

const StyledNavItem = styled.h2`
  display: inline-block;
  margin-right: 45px;
`

const NavBar = () => (
  <div>
    <Link to="/patients"><StyledNavItem>Patients</StyledNavItem></Link>
    <Link to="/appointments"><StyledNavItem>Appointments</StyledNavItem></Link>
  </div>
)

const StyledNavBar = styled(NavBar) `
  background: black;
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0px;
`

const Routes = () => (
  <Router>
    <div>
      <StyledNavBar />

      <Route path="/patients" component={PatientsContainer} />
      <Route path="/patient/:id" component={PatientContainer} />
    </div>
  </Router>
)

export default Routes;
