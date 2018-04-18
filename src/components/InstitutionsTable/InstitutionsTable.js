import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import store from '../../main_store';
import setStates from '../../state';
import { selectInstitution, removeInstitution } from './Actions/selectInstitution';
import { getInstitutionsByOffset, getInstitutionsByName } from './Actions/InstitutionsAjax';
import countriesAjax from './Actions/countriesAjax';

class InstitutionsTable extends Component {
  constructor(props) {
    super(props);
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 5,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false,
      onPageChange: this.onPageChange,
      onFilterChange: this.afterColumnFilter.bind(this)
    }
    this.selectRowProp = this.selection();
  }

  componentDidMount(){
    getInstitutionsByOffset();
    countriesAjax();
  }

  selection(){
    return {
      select: {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: this.onRowSelect.bind(this)
      },
      nonSelect: {}
    }[this.props.select];
  }

  onPageChange(page, sizePerPage) {
    const currentIndex = (page - 1) * sizePerPage;
    getInstitutionsByOffset(sizePerPage, currentIndex);
  };

  afterColumnFilter(filterConds) {
    if (filterConds.countries) {
      let countryFilterValue = filterConds.countries.value;
      let countryFilterObject = this.props.countries.countries.find(o => o.name_english === countryFilterValue);
      if (countryFilterObject) {
        filterConds.countries.value = countryFilterObject.id;
      }
    }
    getInstitutionsByName(filterConds);
  }

  onRowSelect(row, isSelected){
    if (isSelected) {
      selectInstitution(row, this.props.reportForm.institutions);
    } else {
      removeInstitution(row, this.props.reportForm.institutions);
    }
  }

  institutionCountries(countries) {
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
          id: institution.id,
          eter_id: institution.eter_id,
          deqar_id: institution.deqar_id,
          name_primary: institution.name_primary,
          countries: this.institutionCountries(institution.countries)
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

  filterCountries() {
    let countries = this.props.countries.countries;
    let filterCountries = new Object();
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

  render() {
    const fetchInfo = {
      dataTotalSize: this.getfetchInfo()
    };

    const countries = this.filterCountries()

    return (
      <BootstrapTable data={ this.getInstitutionsRows() }
                      version="4"
                      striped remote pagination condensed
                      options={ this.options }
                      fetchInfo={ fetchInfo }
                      selectRow={ this.selectRowProp }>
        <TableHeaderColumn dataField="id" dataSort isKey>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="eter_id"
                           filter={ { type: 'TextFilter' } }
                           dataSort>ETER Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name_primary"
                           filter={ { type: 'TextFilter' } }
                           dataSort>Institution</TableHeaderColumn>
        <TableHeaderColumn dataField="countries"
                           dataSort filter={ { type: 'SelectFilter', options: countries } }>Countries</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default connect(setStates)(InstitutionsTable);
