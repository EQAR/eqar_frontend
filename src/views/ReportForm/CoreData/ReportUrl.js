import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Row,
  Col,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addEmptyReportLink } from '../Actions/reportFormActions';


class ReportUrl extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.createLinkCard = this.createLinkCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    addEmptyReportLink(this.props.reportForm.reportLinks);
  }

  handleInput(e) {
    if (event.key !== 'Enter' && event.key !== undefined) {
      return;
    } else {
      loginUser(this.username, this.password);
    }
    addReportLink(e.target.value, e.target.id);
  }

  createLinkCard() {
    return this.props.reportForm.reportLinks.map((link, i) => {
      return (
        <Card key={i}>
          <CardHeader>
            View Report on Agency Website
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="urlToReport">URL to Page</Label>
              <Input type="text" name="text" id="urlToReport" placeholder="Enter URL to page of report" onChange={this.handleInput} className={''+i+''}/>
            </FormGroup>
            <FormGroup>
              <Label for="textOfUrl">Display Text for URL</Label>
              <Input type="text" name="text" id="textOfUrl" placeholder="Enter display text for URL" onChange={this.handleInput} className={''+i+''}/>
            </FormGroup>
          </CardBody>
          <CardFooter>
              <Button color="primary" id={i}>Remove</Button>
          </CardFooter>
        </Card>
      )
    })
  }

  render() {
    return (
      <div>
        {this.createLinkCard()}
        <Button color="primary" onClick={this.handleClick}>Add Link</Button>
      </div>
    )
  }
}

export default connect(setStates)(ReportUrl);
