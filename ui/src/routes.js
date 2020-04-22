import React from 'react';
import OfferList from './components/OfferList.jsx';
import VolunteerList from './components/VolunteerList.jsx';
import PatientList from './components/PatientList.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import PatientDetails from './components/PatientDetail.jsx';
import CreateOffer from './components/CreateOffer.jsx';
import UserProfile from './components/UserProfile.jsx';

export default [
  {
    path: '/users/edit',
    exact: true,
    component: <UserProfile />,

  },
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
    path: '/offers/new',
    exact: false,
    component: <CreateOffer />,

  },
  {
    path: '/offers',
    exact: false,
    component: <OfferList />,
  },
  {
    path: '/patients/:id',
    exact: false,
    component: <PatientDetails />,
  },
  {
    path: '/patients',
    exact: true,
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
