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
import { addEmptyReportLink, addReportLink, removeLink } from '../Actions/reportFormActions';


class ReportUrl extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.createLinkCard = this.createLinkCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getButton = this.getButton.bind(this);
  }

  handleClick() {
    addEmptyReportLink(this.props.reportForm.report_links);
  }

  handleInput(indexOfInput, e) {
    addReportLink(e.target.value, e.target.id, this.props.reportForm.report_links, indexOfInput);
  }

  handleRemove(e) {
    removeLink(e.target.id, this.props.reportForm.report_links);
  }

  getButton(index) {
    return index !== 0 ? <Button color="danger" size={'sm'} id={index} onClick={this.handleRemove}>Remove</Button>
    : null;
  }

  createLinkCard() {
    return this.props.reportForm.report_links.map((link, i) => {
      return (
        <Card key={i}>
          <CardHeader>
            View Report on Agency Website
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="urlToReport">URL to Page</Label>
              <Input type="text" name="urlToReport" id="link" placeholder="Enter URL to page of report" onChange={this.handleInput.bind(null, i)}/>
            </FormGroup>
            <FormGroup>
              <Label for="textOfUrl">Display Text for URL</Label>
              <Input type="text" name="textOfUrl" id="link_display_name" placeholder="Enter display text for URL" onChange={this.handleInput.bind(null, i)} />
            </FormGroup>
          </CardBody>
          <CardFooter>
              {this.getButton(i)}
          </CardFooter>
        </Card>
      )
    })
  }

  render() {
    return (
      <div>
        {this.createLinkCard()}
        <Button color="primary" size={'sm'} onClick={this.handleClick}>Add More Link</Button>
      </div>
    )
  }
}

export default connect(setStates)(ReportUrl);
