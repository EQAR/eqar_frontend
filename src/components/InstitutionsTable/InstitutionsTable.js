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
      withFirstAndLast: false
    }
    this.selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: this.onRowSelect,
      reportFormInt: this.props.reportForm.institutions
    };
  }

  componentDidMount(){
    getInstitutions();
  }

  onRowSelect(row, isSelected){
    selectInstitution(row, this.reportFormInt);
  }

  getCountries(countries) {
    countries = countries.map(country => country.country);
    const countriesString = countries.reduce((countryString, country) => countryString + ', ' + country);
    return countriesString;
  }

  getInstitutionsRows() {
    let institutions = this.props.institutions.institutions;
    if (institutions) {
      institutions = institutions.map(institution => {
        return {
          'id': institution.id,
          'eter_id': institution.eter_id,
          'name': institution.name_primary,
          'countries': this.getCountries(institution.countries)
        }
      });
    } else {
      institutions = [];
    }
    return institutions;
  }

  render() {
    return (
      <BootstrapTable data={this.getInstitutionsRows()} version="4" striped hover pagination search options={this.options} selectRow={ this.selectRowProp }>
        <TableHeaderColumn dataField="id" dataSort>Id</TableHeaderColumn>
        <TableHeaderColumn isKey dataField="eter_id">ETER Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataSort>Institution</TableHeaderColumn>
        <TableHeaderColumn dataField="countries" dataSort>Countries</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default connect(setStates)(InstitutionsTable);
