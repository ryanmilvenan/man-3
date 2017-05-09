import React from 'react';
import PropTypes from 'prop-types';

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
