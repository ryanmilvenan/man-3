import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_STATE_ACTION_CREATORS } from 'reducers/app_state_reducer';
import Drawer from 'material-ui/Drawer';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';
import AddNewsContainer from 'containers/AddNewsContainer.js'

let SideMenu = ({ drawerOpen, sourcesExpanded, toggleSources }) => (
  <Drawer 
    open={drawerOpen}
    openSecondary={true}
  >
    <Toolbar>
      <ToolbarTitle
        text="Options"
      />
    </Toolbar>
    <MenuItem 
      primaryText="Sources"
      leftIcon={<DeveloperBoard />}
      onTouchTap={() => toggleSources()}
    />
    {sourcesExpanded &&
      <AddNewsContainer />
    }
  </Drawer>
)

SideMenu.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  sourcesExpanded: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    drawerOpen: ownProps.drawerOpen,
    sourcesExpanded: ownProps.sourcesExpanded
  }
}

const mapDispatchToProps = {
  ...APP_STATE_ACTION_CREATORS
}

SideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)

export default SideMenu;
