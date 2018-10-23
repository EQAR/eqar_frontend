import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { selectInstitution, removeInstitution, InstitutionsRequest } from './actions';
import { openInstitutionForm, institutionRequest, resetFields } from '../InstitutionForm/actions';
import { getInstituionCountries } from '../countries/actions';
import { Button, Modal, ModalBody, Row, Col } from 'reactstrap';
import InstitutionModal from '../InstitutionForm';
import _ from 'lodash';

class InstitutionsReferenceTable extends Component {
  constructor(props) {
    super(props);
    this.options = {
      hideSizePerPage: false,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: true,
      defaultSortName: 'name_primary',
      defaultSortOrder: 'asc',
      onPageChange: this.onPageChange.bind(this),
      onFilterChange: this.onFilterChange.bind(this),
      onSortChange: this.onSortChange.bind(this),
      paginationPanel: this.renderPaginationPanel.bind(this),
      paginationShowsTotal: this.renderShowsTotal.bind(this)
    };
    this.state = {
      selected: [],
      select: {},
      unselectable: this.selectedInstitutions()
    }
    this.selectedInstitutions = this.selectedInstitutions.bind(this);
    this.trClassFormat = this.trClassFormat.bind(this);
    this.buttonFormatter = this.buttonFormatter.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getSelectRow = this.getSelectRow.bind(this);
    this.showsTotal = '';
    this.toggleModal = this.props.toggle;
  }

  componentDidMount(){
    InstitutionsRequest();
    getInstituionCountries();
  }

  componentDidUpdate() {
    let selectedInstitutions = this.state.selected;
  }

  getSelectRow() {
    return this.props.isSelect ?
      {
        mode: 'radio',
        hideSelectColumn: true,
        clickToSelect: true,
        selected: this.state.selected,
        onSelect: this.onRowSelect.bind(this),
        unselectable: this.state.unselectable
      } :
      {}
  }

  addNewInstitution() {
    resetFields();
    openInstitutionForm({isSelect: false, addNew: true});
  }

  onRowSelect(row, isSelected, e){    
    if (isSelected && e.target.id !== 'open-form') {
      selectInstitution(row, this.props.reportForm.institutions);
      this.toggleModal();
    } 
  }

  onSortChange(sortName, sortOrder) {
    const param = {};
    if (sortOrder === 'asc') {
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

  selectedInstitutions() {
    return this.props.reportForm.institutions.map(institution => {
      return institution.deqar_id;
    })
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
    remoteObj.sort = true;
    remoteObj.pagination = true;
    remoteObj.filter = true;
    return remoteObj;
  }

  buttonFormatter(cell, row, formatExtraData, index) {
    return (
      <Button size="sm" color="primary" id="open-form" onClick={this.toggle.bind(null, row)}>View</Button>
    );
  }

  trClassFormat(row, rowIndex) {
    let className = '';
    this.props.reportForm.institutions.forEach(institution => {
      if (institution.deqar_id === row.deqar_id) {
        className = 'selected-row';
      }
    })
    return className;
  }

  toggle(row, options) {
    institutionRequest(row.id);
    openInstitutionForm({isSelect: this.props.isSelect, addNew: false});
  }

  renderShowsTotal(start, to, total) {
    this.showsTotal = (
      <div>
        From { start } to { to }, totals is { total }
      </div>
    );
  }

  renderPaginationPanel(props) {    
    return (
      <Row className="institution-table-footer">
        <div>{ props.components.sizePerPageDropdown }</div>
        <div>{ this.showsTotal }</div>
        <div>{ props.components.pageList }</div>
      </Row>
    )
  }

  render() {
    const selectRow = this.getSelectRow();
    const countries = this.filterCountries();
    return (
      <div>
        <InstitutionModal />
        <BootstrapTable data={ this.getInstitutionsRows() }
                        version="4"
                        striped
                        hover
                        remote={ this.remote }
                        pagination={ true }
                        options={ this.options }
                        fetchInfo = {
                          {
                            dataTotalSize: this.props.institutionReferences.totalDataSize
                          }
                        }
                        selectRow={ selectRow }
                        trClassName={ this.trClassFormat }
                        id="institution-table">
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
                             filter={ { type: 'SelectFilter', options: countries } }
                             dataSort={ true }>Countries</TableHeaderColumn>
          <TableHeaderColumn dataField="id"
                             dataAlign='center'
                             width='10%'
                             dataFormat={this.buttonFormatter}> </TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default connect(setStates)(InstitutionsReferenceTable);
