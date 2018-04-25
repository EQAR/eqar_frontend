import React, { Component } from 'react';
import {
  FormGroup,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
  Row} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { removeFile, editFile } from './actions';


class AssignedFiles extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.reportFiles = this.reportFiles.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getDisplayText = this.getDisplayText.bind(this);
  }

  handleRemove(e) {
    removeFile(e.target.id, this.props.reportForm.report_files);
  }

  handleEdit(e) {
    editFile(e.target.id, this.props.reportForm.report_files);
  }

  getDisplayText(file){
    let disPlayText = ''
    if (file.display_name) {
      disPlayText = file.display_name;
    } else if (file.original_location) {
      disPlayText = file.original_location;
    } else {
      disPlayText = file.uploaded_file[0].name;
    }
    return disPlayText;
  }

  reportFiles() {
    return this.props.reportForm.report_files.map((file, i) => {
      return(
        <ListGroupItem key={i} className="justify-content-between">
              {this.getDisplayText(file)}{' '}
              <Button color="danger" size={'sm'} id={i} onClick={this.handleRemove} className="float-right">Remove</Button>
              <Button color="primary" size={'sm'} id={i} onClick={this.handleEdit} className="float-right programme-edit">Edit</Button>
        </ListGroupItem>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <ListGroup>
          {this.reportFiles()}
        </ListGroup>
      </FormGroup>
    )
  }
}

export default connect(setStates)(AssignedFiles);
