import React from 'react';
import OfferList from './components/OfferList.jsx';
import VolunteerList from './components/VolunteerList.jsx';
import PatientList from './components/PatientList.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import PatientDetail from './components/PatientDetail.jsx';
import VolunteerDetail from './components/VolunteerDetail.jsx';
import CreateOffer from './components/CreateOffer.jsx';
import UserProfile from './components/UserProfile.jsx';

export default [
  {
    path: '/users/edit',
    exact: true,
    component: <UserProfile />,
  },
  {
    path: '/volunteers/:id',
    exact: false,
    component: <VolunteerDetail />,
  },
  {
    path: '/patients/:id',
    exact: false,
    component: <PatientDetail />,
  },
  {
    path: '/offers/new',
    exact: false,
    component: <CreateOffer />,

  },
  {
    path: '/',
    exact: true,
    component: <PatientList />,
  },
  {
    path: '/volunteers',
    exact: true,
    component: <VolunteerList />,
  },
  {
    path: '/offers',
    exact: false,
    component: <OfferList />,
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
