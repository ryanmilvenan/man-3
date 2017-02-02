import React, { PropTypes, Component } from 'react';
import { SOCKET_EVENTS_ACTION_CREATORS } from '../reducers/socket_io_reducer.js';
import { connect } from 'react-redux';

export class NewsContainer extends Component {
	componentDidMount() {
    this.props.refreshSource(this.props.id, this.props.url)
    setInterval(this.props.refreshSource, this.props.timeout, this.props.id, this.props.url)
	}
	render() {
		return (
			<div>
				<p>{this.props.url}</p>
			</div>
		)
	}
}

NewsContainer.propTypes = {
  refreshSource: PropTypes.func
}

const mapDispatchToProps = {
  ...SOCKET_EVENTS_ACTION_CREATORS
}

export default connect(
  undefined,
  mapDispatchToProps
)(NewsContainer);
