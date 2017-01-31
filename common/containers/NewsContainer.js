import React, { PropTypes } from 'react';

const NewsContainer = ({id, url, timeout}) => (
  <div>
    <p>{id}</p>
		<p>{url}</p>
  </div>
);

export default NewsContainer;
