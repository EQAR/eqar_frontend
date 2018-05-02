import React, { Component } from 'react';
import {
  FormGroup,
  Row,
  Col,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Collapse,
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
    this.getHR = this.getHR.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      fadeIn: true,
      timeout: 300
    };
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

  getHR() {
    return this.props.reportForm.report_links.length > 1 ? <hr/> : null;
  }

  getToggleText() {
    return this.state.collapse ? 'hide' : 'show'
  }

  isAlert(index, key) {
    if (!lodash.isEmpty(this.props.message.errorMessage.report_links) &&
        this.props.message.errorMessage.report_links[index]) {
      return this.props.message.errorMessage.report_links[index][key] ? true : false;
    } else {
      return false;
    }
  }

  getErrorMessage(index, key) {
    if (!lodash.isEmpty(this.props.message.errorMessage.report_links) &&
        this.props.message.errorMessage.report_links[index]) {
      return this.props.message.errorMessage.report_links[index][key];
    }
  }

  isLink(index) {
    return lodash.isEmpty(this.props.reportForm.report_links[index].link);
  }

  isDisabled() {
    return lodash.isEmpty(lodash.last(this.props.reportForm.report_links).link);
  }

  toggle(e) {
    this.setState({collapse: !this.state.collapse});
  }

  createLinkCard() {
    return this.props.reportForm.report_links.map((link, i) => {
      return (
        <div key={i}>
          <FormGroup>
            <Label for="urlToReport">URL to page</Label>
            <Input type="text" name="urlToReport" id="link" placeholder="Enter URL to page of report" onChange={this.handleInput.bind(null, i)} value={link.link}/>
            <FormAlert isOpen={this.isAlert(i, 'link')} alertMessage={this.getErrorMessage(i, 'link')}/>
          </FormGroup>
          <FormGroup>
            <Label for="textOfUrl">Display text for URL</Label>
            <Input type="text" name="textOfUrl" id="link_display_name" placeholder="Enter display text for URL" onChange={this.handleInput.bind(null, i)} disabled={this.isLink(i)} value={link.link_display_name}/>
            <FormAlert isOpen={this.isAlert(i, 'link_display_name')} alertMessage={this.getErrorMessage(i, 'link_display_name')}/>
          </FormGroup>
          {this.getButton(i)}
          {this.getHR()}
        </div>
      )
    })
  }

  render() {
    return (
      <Card className={'subform'}>
        <CardHeader>
          View report on agency website
          <div className="pull-right">
            (<Button color="link" onClick={this.toggle} className="link-button">{this.getToggleText()}</Button>)
          </div>
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            {this.createLinkCard()}
          </CardBody>
        </Collapse>
        <CardFooter>
          <Button color="primary" size={'sm'} onClick={this.handleClick} disabled={this.isDisabled()}>Add More Link</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default connect(setStates)(ReportUrl);
