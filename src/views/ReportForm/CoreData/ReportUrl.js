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
  }

  handleClick() {
    addEmptyReportLink(this.props.reportForm.reportLinks);
  }

  handleInput(indexOfInput, e) {
    addReportLink(e.target.value, e.target.id, indexOfInput, this.props.reportForm.reportLinks);
  }

  handleRemove(e) {
    console.log(e.target.id)
    removeLink(e.target.id, this.props.reportForm.reportLinks);
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
              <Input type="text" name="text" id="urlToReport" placeholder="Enter URL to page of report" onChange={this.handleInput.bind(null, i)} value={link.url}/>
            </FormGroup>
            <FormGroup>
              <Label for="textOfUrl">Display Text for URL</Label>
              <Input type="text" name="text" id="textOfUrl" placeholder="Enter display text for URL" onChange={this.handleInput.bind(null, i)} value={link.text}/>
            </FormGroup>
          </CardBody>
          <CardFooter>
              <Button color="primary" id={i} onClick={this.handleRemove}>Remove</Button>
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
