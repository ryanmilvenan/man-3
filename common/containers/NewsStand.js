import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NewsContainer from './NewsContainer.js'

let NewsStand = ({ newsContainers }) => (
  <div>
    {newsContainers.map(newsContainer =>
      <NewsContainer
        key={newsContainer.id}
        {...newsContainer}
      />
    )}
  </div>
);

NewsStand.propTypes = {
  newsContainers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    timeout: PropTypes.number.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = (state) => {
  return {
    newsContainers: state.newsContainers
  }
}

NewsStand = connect(
  mapStateToProps
)(NewsStand)


export default NewsStand;
