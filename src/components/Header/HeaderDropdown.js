import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Progress,
} from 'reactstrap';

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img src={'img/avatars/2.png'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
          <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default HeaderDropdown;
