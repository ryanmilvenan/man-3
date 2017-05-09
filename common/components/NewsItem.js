import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NEWS_ITEM_ACTION_CREATORS } from 'reducers/news_container_reducer';

let NewsItem = ({ title, content, link, expanded, onClick, img, raw_html }) => {
  return (
    <div className="news-item">
      <i 
        className={expanded ? "fa fa-minus-square-o" : "fa fa-plus-square-o"}
        aria-hidden="true" 
        onClick={onClick}>
      </i>
      <a href={link}>{title}</a>
      {expanded && 
        <div className="content">
          {raw_html ?
            <div className="table-data" dangerouslySetInnerHTML={raw_html} />
            :
            <p>{content}</p>
          }
        </div>
      }
    </div>
)}

NewsItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  containerId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  content: PropTypes.string,
  img: PropTypes.string,
  raw_html: PropTypes.object,
  onClick: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
}

const mapDispatchToProps = {
  ...NEWS_ITEM_ACTION_CREATORS  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsItem);
