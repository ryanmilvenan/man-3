import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SOCKET_EVENTS_ACTION_CREATORS } from 'reducers/socket_io_reducer';
import NewsContainer from './NewsContainer.js'

export class NewsStand extends Component {

  componentDidUpdate(prevProps, prevState) {
    if(this.props.newsContainers !== prevProps.newsContainers
      && this.props.newsContainers.length) {
      this.props.persistState(this.props.newsContainers);
    }
  }

  render() {
    return (
      <div className="news-stand">
        {this.props.newsContainers.map((newsContainer, id) =>
          <NewsContainer
            key={id}
            {...newsContainer}
          />
        )}
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
    newsContainers: state.newsContainers
  }
}

const mapDispatchToProps = {
  ...SOCKET_EVENTS_ACTION_CREATORS
}

NewsStand = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsStand)


export default NewsStand;
