import React from 'react';
import OfferList from './components/OfferList.jsx';
import VolunteerList from './components/VolunteerList.jsx';
import PatientList from './components/PatientList.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';

export default [
  {
    path: '/',
    exact: true,
    component: <VolunteerList />,
  },
  {
    path: '/volunteers',
    exact: false,
    component: <VolunteerList />,
  },
  {
    path: '/offers',
    exact: false,
    component: <OfferList />,
  },
  {
    path: '/patients',
    exact: false,
    component: <PatientList/>,
  },
  {
    path: '/signin',
    exact: false,
    component: <Signin/>,
  },
  {
    path: '/signup',
    exact: false,
    component: <Signup/>,
  },
];
