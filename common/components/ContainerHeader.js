import React, { PropTypes } from 'react';

export const ContainerHeader = ({ title, onClick }) => (
  <div className="container-header">
    {title}
    <button onClick={onClick}>Delete</button>
  </div>
)

ContainerHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default ContainerHeader;
