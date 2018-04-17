import React, { Component } from 'react';
import {connect} from "react-redux";
import setStates from "../../state";
import {getActivities, getAgencies} from "../ReportForm/CoreData/actions";
import {BootstrapTable} from "react-bootstrap-table";


class AgencyActivitiesTable extends Component {
  constructor(props) {
    super(props);
    this.options = {
      hideSizePerPage: false,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: true,
      sizePerPageList: [ 5, 10, 20 ]
    };
  }

  componentDidMount() {
    getAgencies();
    getActivities();
  }

  getAgencyActivityRows() {
    return this.props.activities.activities.map(activity => {
      return {
        id: activity.id,
        agency: activity.agency,
        activity: activity.activity,
        type: activity.activity_type,
      }
    });
  }

  filterAgencies() {
    let filterAgency = {};
    let array = this.props.activities.activities;
    const unique = [...new Set(array.map(item => item.agency))];
    unique.forEach((agency) => {
      filterAgency[agency] = agency;
    })
    return filterAgency;
  }

  filterActivityTypes() {
    let filterActivityType = {};
    let array = this.props.activities.activities;
    const unique = [...new Set(array.map(item => item.activity_type))];
    unique.forEach((activity_type) => {
      filterActivityType[activity_type] = activity_type;
    })
    return filterActivityType;
  }

  render() {
    const agencies = this.filterAgencies()
    const activityTypes = this.filterActivityTypes()

    return (
      <BootstrapTable data={ this.getAgencyActivityRows() }
                      version="4"
                      striped
                      pagination={ true }
                      options={ this.options }>
        <TableHeaderColumn dataField="id"
                           dataSort={ true }
                           width='10%'
                           filter={ { type: 'TextFilter' } }
                           isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="agency"
                           dataSort={ true }
                           width='15%'
                           filter={ { type: 'SelectFilter', options: agencies } }>Agency</TableHeaderColumn>
        <TableHeaderColumn dataField="activity"
                           filter={ { type: 'TextFilter' } }
                           width='50%'
                           dataSort={ true }>Activity Description</TableHeaderColumn>
        <TableHeaderColumn dataField="type"
                           width='25%'
                           filter={ { type: 'SelectFilter', options: activityTypes } }
                           dataSort={ true }>Activity Type</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default connect(setStates)(AgencyActivitiesTable);