import React, { PropTypes } from 'react';

export const ContainerHeader = ({ title }) => (
  <div className="container-header">
    {title}
  </div>
)

ContainerHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default ContainerHeader;
