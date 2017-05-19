import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SOCKET_EVENTS_ACTION_CREATORS } from 'reducers/socket_io_reducer';
import NewsItem from 'components/NewsItem';
import CircularProgress from 'material-ui/CircularProgress';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';


export class NewsContainer extends Component {
	componentDidMount() {
    this.props.refreshSource(this.props);
    setInterval(this.props.refreshSource, this.props.timeout, this.props)
	}

	render() {
    return (
     <div className="news-container">
      <Toolbar>
        <ToolbarTitle
          text={this.props.url}
        />
      </Toolbar>
      <Paper
        zDepth={3}
        style={{display: 'flex', flexDirection: 'column'}}
      >
        {this.props.loading ? 
          <CircularProgress 
            size={120}
            style={{
              alignSelf: 'center',
              marginTop: '3rem',
              marginBottom: '3rem',
            }}
            />
        : 
        this.props.items.map((item, idx) => 
          <NewsItem
            key={idx}
            {...item}
          />
        )}
      </Paper>
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);
