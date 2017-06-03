import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NEWS_CONTAINER_ACTION_CREATORS } from 'reducers/news_container_reducer';
import { ASYNC_ACTION_CREATORS } from 'reducers/async_reducer';
import { APP_STATE_ACTION_CREATORS } from 'reducers/app_state_reducer';
import { AUTH_ACTION_CREATORS } from 'reducers/auth_reducer';
import { getStoredAuthState } from 'auth/utils';
import NewsContainer from './NewsContainer';
import SideMenu from '../components/SideMenu';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


export class NewsStand extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown.bind(this), false);
    this.props.verifyLogin();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown.bind(this), false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.newsContainers !== prevProps.newsContainers &&
      this.props.newsContainers.length && this.newsContainersAdded(prevProps)
      && this.props.auth.idToken) {
      this.props.persistState(this.props.newsContainers, this.props.auth.idToken);
    }
  }

  newsContainersAdded(prevProps) {
    return prevProps.newsContainers && (prevProps.newsContainers.length !== this.props.newsContainers.length);
  }

  handleKeydown(e) {
    switch (e.keyCode) {
      case 27:
        this.props.resetContainerState();
        break;
    }
  }

  render() {
    return ( 
      <div className = "news-stand" >
        <AppBar title = "Homepage 3.0"
          onTitleTouchTap = {
            () => {
              this.props.resetTextFields();
              this.props.toggleDrawer();
            }
          }
          showMenuIconButton = { false }
          iconElementRight={
            this.props.auth.idToken ? 
            <FlatButton label="Log Out" onTouchTap={() => {this.props.logout()}}/>
              :
            <FlatButton label="Login" onTouchTap={() => {this.props.loginRequest()}}/>
          }
        />  
        {
          this.props.newsContainers.map((newsContainer, id) =>
            <NewsContainer 
              key = { id }
              id = { id } 
              auth = { this.props.auth }
              {...newsContainer }
            />
          )
        } 
        <SideMenu {...this.props.appState } />  
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
    appState: state.appState,
    auth: state.auth
  }
}

const mapDispatchToProps = {
  ...APP_STATE_ACTION_CREATORS,
  ...NEWS_CONTAINER_ACTION_CREATORS,
  ...ASYNC_ACTION_CREATORS,
  ...AUTH_ACTION_CREATORS
}

NewsStand = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsStand)


export default NewsStand;