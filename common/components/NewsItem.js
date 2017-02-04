import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const NewsItem = ({ text, url }) => (
  <div className="news-item">
    <a href={url}>Link</a>
  </div>
)

NewsItem.propTypes = {
  id: PropTypes.number.isRequired,
  headline: PropTypes.string.isRequired,
  detail: PropTypes.string,
  url: PropTypes.string.isRequired,
  expand: PropTypes.func,
  expanded: PropTypes.bool.isRequired
}

export default connect()(NewsItem);
