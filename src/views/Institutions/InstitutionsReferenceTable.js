import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import store from '../../main_store';
import setStates from '../../state';
import { InstitutionsRequest } from './Actions/InstitutionsAjax';
import { selectInstitution, removeInstitution } from './Actions/selectInstitution';
import countriesAjax from './Actions/countriesAjax';
import { Button } from 'reactstrap';

class InstitutionsReferenceTable extends Component {
  constructor(props) {
    super(props);
    this.options = {
      hideSizePerPage: false,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: true,
      onPageChange: this.onPageChange.bind(this),
      onFilterChange: this.onFilterChange.bind(this),
      onSortChange: this.onSortChange.bind(this),
      sizePerPageList: [ 5, 10, 20 ]
    };
    this.state = {
      select: {}
    }
  }

  componentWillMount() {
    this.props.isSelect ?
      this.setState( {
        select: {
          mode: 'checkbox',
          clickToSelect: true,
          onSelect: this.onRowSelect.bind(this)
        }
      }) :
      this.setState( {
        select: {}
      })
  }

  onRowSelect(row, isSelected){
    if (isSelected) {
      selectInstitution(row, this.props.reportForm.institutions);
    } else {
      removeInstitution(row, this.props.reportForm.institutions);
    }
  }

  componentDidMount(){
    InstitutionsRequest();
    countriesAjax();
  }

  onSortChange(sortName, sortOrder) {
    const param = {};
    if(sortOrder === 'asc') {
      param['ordering'] = sortName;
    } else {
      param['ordering'] = '-' + sortName;
    }
    InstitutionsRequest(
      {
        ...this.props.institutionReferences.settings,
        ...param
      }
    )
  }

  onPageChange(page, sizePerPage) {
    const currentIndex = (page - 1) * sizePerPage;
    InstitutionsRequest(
      {
        ...this.props.institutionReferences.settings,
        limit: sizePerPage,
        offset: currentIndex
      }
    )
  };

  onFilterChange(filterConds) {
    let param = {};

    if (filterConds.countries) {
      let countryFilterValue = filterConds.countries.value;
      let countryFilterObject = this.props.countries.countries.find(o => o.name_english === countryFilterValue);
      if (countryFilterObject) {
        filterConds.countries.value = countryFilterObject.id;
      }
    }
    (filterConds.name_primary) ? param['query'] = filterConds.name_primary.value : param['query'] = '';
    (filterConds.countries) ? param['country'] = filterConds.countries.value : param['country'] = null;
    (filterConds.eter_id) ? param['eter_id'] = filterConds.eter_id.value : param['eter_id'] = '';
    (filterConds.deqar_id) ? param['deqar_id'] = filterConds.deqar_id.value : param['deqar_id'] = '';

    InstitutionsRequest(
      {
        ...this.props.institutionReferences.settings,
        ...param
      }
    )
  }

  getInstitutionsRows() {
    return this.props.institutionReferences.institutions.map(institution => {
      return {
        id: institution.id,
        deqar_id: institution.deqar_id,
        eter_id: institution.eter_id,
        name_primary: institution.name_primary,
        countries: institution.countries.map(country => country.country),
      }
    });
  }

  filterCountries() {
    let countries = this.props.countries.countries;
    let filterCountries = {};
    if (countries.length > 0) {
      countries.forEach((country) => {
        filterCountries[country.name_english] = country.name_english
      });
    } else {
      filterCountries = {
        0: 'No data'
      }
    }
    return filterCountries;
  }

  remote(remoteObj) {
    // Only cell editing, insert and delete row will be handled by remote store
    remoteObj.sort = true;
    remoteObj.pagination = true;
    remoteObj.filter = true;
    return remoteObj;
  }

  buttonFormatter(cell, row) {
    return (
      <Button size="sm" color="primary">View</Button>)
  }

  render() {
    const countries = this.filterCountries();
    return (
      <BootstrapTable data={ this.getInstitutionsRows() }
                      version="4"
                      striped
                      remote={ this.remote }
                      pagination={ true }
                      options={ this.options }
                      fetchInfo = {
                        {
                          dataTotalSize: this.props.institutionReferences.totalDataSize
                        }
                      }
                      selectRow={ this.state.select }>
        <TableHeaderColumn dataField="deqar_id"
                           dataSort={ true }
                           width='15%'
                           filter={ { type: 'TextFilter' } }
                           isKey>DEQARINST ID</TableHeaderColumn>
        <TableHeaderColumn dataField="eter_id"
                           filter={ { type: 'TextFilter' } }
                           width='15%'
                           dataSort={ true }>ETER ID</TableHeaderColumn>
        <TableHeaderColumn dataField="name_primary"
                           width='45%'
                           filter={ { type: 'TextFilter' } }
                           dataSort={ true }>Institution</TableHeaderColumn>
        <TableHeaderColumn dataField="countries"
                           width='15%'
                           filter={ { type: 'SelectFilter', options: countries } }>Countries</TableHeaderColumn>
        <TableHeaderColumn dataField="id"
                           dataAlign='center'
                           width='10%'
                           dataFormat={this.buttonFormatter}> </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default connect(setStates)(InstitutionsReferenceTable);
