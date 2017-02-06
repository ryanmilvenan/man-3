import React, { PropTypes, Component } from 'react';
import NewsItem from 'components/NewsItem';
import { SOCKET_EVENTS_ACTION_CREATORS } from 'reducers/socket_io_reducer';
import { NEWS_ITEM_ACTION_CREATORS } from 'reducers/news_container_reducer';
import { connect } from 'react-redux';

export class NewsContainer extends Component {
	componentDidMount() {
    this.props.refreshSource(this.props.id, this.props.url)
    setInterval(this.props.refreshSource, this.props.timeout, this.props.id, this.props.url)
	}
	render() {
    return (
      <div>
        {this.props.items.map((item, idx) => 
          <NewsItem
            key={idx}
            {...item}
            onClick={() => this.props.toggleExpand(item.containerId, idx)}
          />
        )}
      </div>
    )
	}
}

NewsContainer.propTypes = {
  refreshSource: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  maxHeadlines: PropTypes.number.isRequired,
  timeout: PropTypes.number.isRequired,
  feed: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return state.newsContainers[ownProps.id] || {};
}

const mapDispatchToProps = {
  ...SOCKET_EVENTS_ACTION_CREATORS,
  ...NEWS_ITEM_ACTION_CREATORS
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);
