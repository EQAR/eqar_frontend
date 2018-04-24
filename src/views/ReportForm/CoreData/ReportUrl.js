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
import FormAlert from '../FormAlert';
import lodash from 'lodash';


class ReportUrl extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.createLinkCard = this.createLinkCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getButton = this.getButton.bind(this);
    this.isAlert = this.isAlert.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.isLink = this.isLink.bind(this);
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

  isAlert(index, key) {
    if (!lodash.isEmpty(this.props.alert.errorMessage.report_links)) {
      return this.props.alert.errorMessage.report_links[index][key] ? true : false;
    } else {
      return false;
    }
  }

  getErrorMessage(index, key) {
    if (!lodash.isEmpty(this.props.alert.errorMessage.report_links)) {
      return this.props.alert.errorMessage.report_links[index][key];
    }
  }

  isLink(index) {
    return lodash.isEmpty(this.props.reportForm.report_links[index].link);
  }

  isDisabled() {
    return lodash.isEmpty(lodash.last(this.props.reportForm.report_links).link);
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
              <FormAlert isOpen={this.isAlert(i, 'link')} message={this.getErrorMessage(i, 'link')}/>
            </FormGroup>
            <FormGroup>
              <Label for="textOfUrl">Display Text for URL</Label>
              <Input type="text" name="textOfUrl" id="link_display_name" placeholder="Enter display text for URL" onChange={this.handleInput.bind(null, i)} disabled={this.isLink(i)}/>
              <FormAlert isOpen={this.isAlert(i, 'link_display_name')} message={this.getErrorMessage(i, 'link_display_name')}/>
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
        <Button color="primary" size={'sm'} onClick={this.handleClick} disabled={this.isDisabled()}>Add Link</Button>
      </div>
    )
  }
}

export default connect(setStates)(ReportUrl);
