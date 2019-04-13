import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}


const Dashboard = Loadable({
  loader: () => import('./views/Communication/AddContacts'),
  loading: Loading,
});

const AddContacts = Loadable({
  loader: () => import('./views/Communication/AddContacts'),
  loading: Loading,
});

const EditContacts = Loadable({
  loader: () => import('./views/Communication/EditContacts'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/Communication', exact: true, name: 'Theme', component: AddContacts },
  { path: '/AddContacts', name: 'AddContacts', component: AddContacts },
  { path: '/EditContacts', name: 'EditContacts', component: EditContacts },
];

export default routes;
