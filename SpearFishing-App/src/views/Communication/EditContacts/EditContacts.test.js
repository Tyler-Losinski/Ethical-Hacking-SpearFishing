import React from 'react';
import ReactDOM from 'react-dom';
import EditContacts from './EditContacts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditContacts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
