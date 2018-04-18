import React, {Component} from 'react';
import { push } from 'redux-first-routing';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import logoutUser from './Actions/Logout';
import { connect } from 'react-redux';
import setStates from '../../state';
import UserAvatar from 'react-user-avatar';
import getUser from './Actions/getUser';
import store from '../../main_store'

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    getUser();
  }

  logout(){
    logoutUser();
  }

  goToProfilePage(){
    store.dispatch(push('/my-profile'));
  }

  render() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <UserAvatar size="40" name={'('+this.props.dashboard.user.username+')'}/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center">
              <strong>{this.props.dashboard.user.username} </strong>
          </DropdownItem>
          <DropdownItem onClick={this.goToProfilePage}>
              <i className="fa fa-user"> </i> Profile
          </DropdownItem>
          <DropdownItem onClick={this.logout}>
              <i className="fa fa-lock"> </i> Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default connect(setStates)(HeaderDropdown);