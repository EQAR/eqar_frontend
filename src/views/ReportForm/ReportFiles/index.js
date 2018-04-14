import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Input,
  Label,
  Button } from 'reactstrap';
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';
import store from '../../../main_store';
import setStates from '../../../state';
import { connect } from 'react-redux';
import FileUrl from './FileUrl';
import Upload from './Upload';
import Languages from './Languages';
import FileName from './FileName';
import AddFile from './AddFile';


class ReportFiles extends Component {
  constructor(props) {
    super(props)
    this.saveChanges = this.saveChanges.bind(this);

    this.state = {
      value: []
    }
  }

  saveChanges(value) {
    this.setState({ value });
  }

  getCountries() {
    return this.props.countries.countries.map((country) => {
      return {
        value: country.id,
        label: country.name_english
      }
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                <FileUrl />
                <Upload />
                <Languages />
                <FileName />
              </CardBody>
              <CardFooter>
                <AddFile />
              </CardFooter>
            </Card>
          </Col>
          <Col xs="6">
            <Card className="info-box">
              <CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(ReportFiles);
