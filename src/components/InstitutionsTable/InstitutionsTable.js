import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { connect } from 'react-redux';
import store from '../../main_store';
import setStates from '../../state';
import selectInstitution from './Actions/SelectInstitution';
import getInstitutions from './Actions/InstitutionsAjax';

class InstitutionsTable extends Component {
  constructor(props) {
    super(props);
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false,
      onPageChange: this.onPageChange
    }
    this.selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: this.onRowSelect,
      reportFormInt: this.props.reportForm.institutions
    };
  }

  onPageChange(page, sizePerPage) {
    const currentIndex = (page - 1) * sizePerPage;
    getInstitutions(sizePerPage, currentIndex);
  }

  componentDidMount(){
    getInstitutions();
  }

  onRowSelect(row, isSelected){
    selectInstitution(row, this.reportFormInt);
  }

  getCountries(countries) {
    countries = countries.map(country => country.country);
    return countries;
  }

  selectInstitutionsState() {
    return {
      allInstitutions: this.props.institutions.institutions,
      reportInstitutions: this.props.reportForm.institutions
    }[this.props.tableType];
  }

  getInstitutionsRows() {
    let institutions = this.selectInstitutionsState();
    if (institutions) {
      institutions = institutions.map(institution => {
        return {
          'id': institution.id,
          'eter_id': institution.eter_id,
          'name_primary': institution.name_primary,
          'countries': this.getCountries(institution.countries)
        }
      });
    } else {
      institutions = [];
    }
    return institutions;
  }

  getfetchInfo() {
    return(this.props.tableType === 'allInstitutions' ? this.props.institutions.count : this.props.reportForm.institutions.length)
  }

  render() {
    const fetchInfo = {
      dataTotalSize: this.getfetchInfo()
    };

    return (
      <BootstrapTable data={ this.getInstitutionsRows() } version="4" striped remote pagination options={ this.options } fetchInfo={ fetchInfo } selectRow={ this.selectRowProp }>
        <TableHeaderColumn dataField="id" dataSort>Id</TableHeaderColumn>
        <TableHeaderColumn isKey dataField="eter_id">ETER Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name_primary" dataSort>Institution</TableHeaderColumn>
        <TableHeaderColumn dataField="countries" dataSort>Countries</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default connect(setStates)(InstitutionsTable);
