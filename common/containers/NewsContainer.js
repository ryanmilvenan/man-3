import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SOCKET_EVENTS_ACTION_CREATORS } from 'reducers/socket_io_reducer';
import { NEWS_ITEM_ACTION_CREATORS } from 'reducers/news_container_reducer';
import NewsItem from 'components/NewsItem';
import ContainerHeader from 'components/ContainerHeader';

export class NewsContainer extends Component {
	componentDidMount() {
    this.props.refreshSource(this.props);
    setInterval(this.props.refreshSource, this.props.timeout, this.props)
	}

	render() {
    return (
      <div className="news-container">
        <ContainerHeader title={this.props.url} onClick={() => this.props.deleteContainer(this.props.id)} />
				{this.props.loading &&
					<div className="loader"></div>
				}
        {!this.props.loading && this.props.items.map((item, idx) => 
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
  return ownProps;
}

const mapDispatchToProps = {
  ...SOCKET_EVENTS_ACTION_CREATORS,
  ...NEWS_ITEM_ACTION_CREATORS
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);
