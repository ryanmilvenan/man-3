import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NEWS_ITEM_ACTION_CREATORS } from 'reducers/news_container_reducer';

let NewsItem = ({ title, content, link, expanded, onClick, img }) => {
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
          {img &&
            <img src={img} className="detail-image"/>
          }
          <p>{content}</p>
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
  onClick: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
	let thisItem, containerId, itemId;	
	if(ownProps._doc) {
		containerId = ownProps._doc.containerId;
		itemId = ownProps._doc.itemId;
	}
	if(typeof ownProps.containerId == 'number') {
		containerId = ownProps.containerId;
		itemId = ownProps.itemId;		
	}
  thisItem = state.newsContainers[containerId] && 
    state.newsContainers[containerId].items[itemId] || {};
	return {
    expanded: thisItem.expanded, 
    containerId: thisItem.containerId,
    itemId: thisItem.itemId,
    img: thisItem.img, 
	  content: thisItem.content,	
		author: thisItem.author,
		publishedDate: thisItem.publishedDate,
		contentSnippet: thisItem.contentSnippet,
		title: thisItem.title,
		link: thisItem.link
	}
}

const mapDispatchToProps = {
  ...NEWS_ITEM_ACTION_CREATORS  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsItem);
