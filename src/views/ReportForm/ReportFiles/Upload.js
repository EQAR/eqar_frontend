import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label,
  Button,
  Col} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addUpload, removeUploadedFile} from './actions';
import lodash from 'lodash';


class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.renderFileName = this.renderFileName.bind(this);
    this.state = {
      value: ''
    }
  }

  handleInput(e) {
    addUpload(e.target.files);
    this.setState(
      {
        value: e.target.value
      }
    )
  }

  handleRemove() {
    removeUploadedFile();
    this.setState(
      {
        value: ''
      }
    )
  }

  renderFileName() {
    if (this.props.reportFile.uploaded_file[0]) {
      return (
        <FormGroup>
          <span>{this.props.reportFile.uploaded_file[0].name}</span>
          <Button color="danger" size={'sm'} onClick={this.handleRemove} className="float-right">Remove</Button>
        </FormGroup>
      )
    return
    }
  }

  render() {
    return (
      <div>
        <FormGroup>
          <p>Or upload file</p>
          <Label for="uploadedFile" className="upload-label">Choose File</Label>
          <Input type="file" name="file" id="uploadedFile" className="file-upload" onChange={this.handleInput} value={this.state.value}/>
        </FormGroup>
        {this.renderFileName()}
      </div>
    )
  }
}

export default connect(setStates)(Upload);
