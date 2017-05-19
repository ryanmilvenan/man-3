import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SOCKET_EVENTS_ACTION_CREATORS } from 'reducers/socket_io_reducer';
import { APP_STATE_ACTION_CREATORS } from 'reducers/app_state_reducer';
import NewsContainer from './NewsContainer';
import SideMenu from '../components/SideMenu';
import AppBar from 'material-ui/AppBar';

export class NewsStand extends Component {

  componentDidUpdate(prevProps, prevState) {
    if(this.props.newsContainers !== prevProps.newsContainers
      && this.props.newsContainers.length && this.newsContainersAdded(prevProps)) {
      this.props.persistState(this.props.newsContainers);
    }
  }

  newsContainersAdded(prevProps) {
    return prevProps.newsContainers.length !== this.props.newsContainers.length;
  }

  render() {
    return (
      <div className="news-stand">
        <AppBar 
          title="Homepage 3.0"
          onTitleTouchTap={() => this.props.toggleDrawer()}
          showMenuIconButton={false}
        />
        {this.props.newsContainers.map((newsContainer, id) =>
          <NewsContainer
            key={id}
            id={id}
            {...newsContainer}
          />
        )}
        <SideMenu
          {...this.props.appState}
        />
      </div>
    )
  }

}

NewsStand.propTypes = {
  newsContainers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    timeout: PropTypes.number.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    newsContainers: state.newsContainers,
    appState: state.appState
  }
}

const mapDispatchToProps = {
  ...SOCKET_EVENTS_ACTION_CREATORS,
  ...APP_STATE_ACTION_CREATORS
}

NewsStand = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsStand)


export default NewsStand;
