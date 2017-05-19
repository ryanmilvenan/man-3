import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()


let NewsItem = ({ title, content, link, img, raw_html }) => {
  return (
    <div className="news-item">
      <Card
        style={{paddingBottom: '10px'}}
      >
        <CardHeader
          subtitle={title}
          actAsExpander={true}
          showExpandableButton={true}
          onClick={() => {window.open(link, "_self", true)}}
        />
        {raw_html ?
          <CardMedia 
            expandable={true}
          >
            <div className="table-data" dangerouslySetInnerHTML={raw_html} />
          </CardMedia>
          :
          <CardText
            expandable={true}>
            <p>{content}</p>
          </CardText>
        }
      </Card>
    </div>
)}

NewsItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  containerId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  content: PropTypes.string,
  img: PropTypes.string,
  raw_html: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
}

export default connect(
  mapStateToProps,
)(NewsItem);
