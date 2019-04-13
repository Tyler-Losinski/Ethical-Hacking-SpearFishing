import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  CardFooter,
  Row,
  Col
} from 'reactstrap';
import $ from 'jquery';
import Alert from 'react-s-alert';

class AddContacts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      phone: '',
      email: '',
    };
  
  }

  componentDidMount() {

  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }


  Reset = () => {
      this.setState({
          firstName: '',
          lastName: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          postalCode: '',
          phone: '',
          email: ''
      });
  }

  uploadFileButton = (event) => {
    console.log(event.target.files[0]);

    //fetch('http://localhost:50769//api/addcontacts/PostFile', {
    //  method: 'POST',
    //  body: { file: event.target.files[0] },
    //}).then((response) => {
    //  console.log(response);
    //});

    $.ajax({
        type: 'POST',
        url: `http://localhost:50769//api/addcontacts/Upload`, // asp connection
        data: { file: event.target.files[0] },
        processData: false,
        contentType: false
    }).done((data) => {
        Alert.success('Contact Saved!', {
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
    });;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader >
            <i className="icon-cloud-download"></i> Import Excel
          </CardHeader>
          <CardBody>
            <Input
              type='file' label='Upload' accept='.xlsx'
              onChange={this.uploadFileButton}
            />
          </CardBody>
        </Card>
        <Card>
          <Form onSubmit={this.hadleSubmit}>
          <CardHeader>
              <i className="icon-pencil"></i> Manually Add
          </CardHeader>
            <CardBody>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="company">First Name</Label>
                    <Input type="text" id="firstName" value={this.state.firstName} onChange={this.onChange} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="vat">Last Name</Label>
                    <Input type="text" id="lastName" value={this.state.lastName} onChange={this.onChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="company">Address 1</Label>
                    <Input type="text" id="address1" value={this.state.address1} onChange={this.onChange} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="vat">Address 2</Label>
                    <Input type="text" id="address2" value={this.state.address2} onChange={this.onChange} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup row className="my-0">
                <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="city">City</Label>
                    <Input type="text" id="city" placeholder="Enter your city" value={this.state.city} onChange={this.onChange} />
                  </FormGroup>
                </Col>
                <Col xs="2">
                  <FormGroup>
                    <Label htmlFor="city">State</Label>
                    <Input type="text" id="state" maxLength="2" placeholder="ex. ND" value={this.state.state} onChange={this.onChange} />
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    <Label htmlFor="postal-code">Postal Code</Label>
                    <Input type="text" id="postalCode" placeholder="Postal Code" value={this.state.postalCode} onChange={this.onChange} />
                  </FormGroup>
                </Col>
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="company">Phone</Label>
                    <Input type="text" id="phone" value={this.state.phone} onChange={this.onChange} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="vat">Email</Label>
                    <Input type="text" id="email" value={this.state.email} onChange={this.onChange} />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" style={{ marginRight: 25 }}><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger" onClick={this.Reset}><i className="fa fa-ban"></i> Reset</Button>
            </CardFooter>
          </Form>

        </Card>
      </div>
    );
  }

  hadleSubmit = (e) => {
    e.preventDefault();

    var Person = {
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Address1: this.state.address1,
      Address2: this.state.address2,
      City: this.state.city,
      State: this.state.state,
      PostalCode: this.state.postalCode,
      Phone: this.state.phone,
      Email: this.state.email
    }

    $.ajax({
      type: 'POST',
      url: `http://localhost:50769//api/addcontacts/SaveContact`, // asp connection
      data: JSON.stringify(Person),
      contentType: "application/json; charset=utf-8", //asp requirement
      dataType: "json" //asp requirement
    }).done((data) => {
      if (data != -1) {
        this.setState({
          firstName: '',
          lastName: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          postalCode: '',
          phone: '',
          email: ''
        });
        Alert.success('Contact Saved!', {
          position: 'bottom-right',
          effect: 'jelly',
          timeout: 3000,
          offset: 35
        });
      } else {
        Alert.error('Something went wrong! Try again later.', {
          position: 'bottom-right',
          effect: 'jelly',
          timeout: 5000,
          offset: 35
        });
      }
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

}

export default AddContacts;
