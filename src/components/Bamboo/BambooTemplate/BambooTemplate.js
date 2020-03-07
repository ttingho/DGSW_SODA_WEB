import React from 'react';
import PropTypes  from 'prop-types';
import BambooItem from '../BambooItem';
import './BambooTemplate.scss';

const BambooTemplate = ({ children }) => {
  return (
    <div className="BambooTemplate">
      {children}
    </div>
  );
}

BambooTemplate.propTypes = {
  
}

export default BambooTemplate;