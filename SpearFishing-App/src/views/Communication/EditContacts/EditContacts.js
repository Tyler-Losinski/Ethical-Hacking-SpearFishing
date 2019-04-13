import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Alert from 'react-s-alert';
import $  from 'jquery';

var products = [{
  id: 1,
  name: "Item name 1",
  price: 100
}, {
  id: 2,
  name: "Item name 2",
  price: 100
} ];

const columns = [{
  dataField: 'FirstName',
  text: 'First Name',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'LastName',
    text: 'Last Name',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'Address1',
    text: 'Address 1',
    sort: true
  }, {
    dataField: 'Address2',
    text: 'Address 2',
    sort: true
  },
  {
    dataField: 'City',
    text: 'City',
    sort: true
  },
  {
    dataField: 'State',
    text: 'State',
    sort: true
  },
  {
    dataField: 'PostalCode',
    text: 'PostalCode',
    sort: true
  },
  {
    dataField: 'Phone',
    text: 'Phone',
    sort: true
  },
  {
    dataField: 'Email',
    text: 'Email',
    sort: true
  }];

class EditContacts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gridData: []
    };

  }

  componentDidMount() {
    this.getContacts();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
              <i className="icon-pencil"></i> All Contacts
          </CardHeader>
          <CardBody>
            <BootstrapTable
              keyField="id"
              data={this.state.gridData}
              columns={columns}
              cellEdit={cellEditFactory({
                mode: 'click',
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column) => { this.saveContact(row) }
              })}
              filter={filterFactory()}
              bordered={false}
            />
          </CardBody>
        </Card>
      </div>
    );
  }

  saveContact = (contact) => {

    console.log(contact);
    $.ajax({
      type: 'POST',
      url: `http://localhost:50769//api/editcontacts/UpdateContact`, // asp connection
      data: JSON.stringify( contact ),
      contentType: "application/json; charset=utf-8", //asp requirement
      dataType: "json" //asp requirement
    }).done((data) => {
      console.log(data);
      Alert.success('Contact Updated!', {
        position: 'bottom-right',
        effect: 'jelly',
        timeout: 3000,
        offset: 35
      });
    }).fail((error) => {
      console.log(error);
      Alert.error('Something went wrong! Try again later.', {
        position: 'bottom-right',
        effect: 'jelly',
        timeout: 5000,
        offset: 35
      });
    });
  }

  getContacts = () => {
    $.ajax({
        type: 'GET',
      url: `http://localhost:50769//api/editcontacts/GetContacts`, // asp connection
      contentType: "application/json; charset=utf-8", //asp requirement
      dataType: "json" //asp requirement
    }).done((data) => {
      console.log(data);
      this.setState({
        gridData: data
      });
    }).fail((error) => {
      console.log(error);
    });
  }

}

export default EditContacts;
