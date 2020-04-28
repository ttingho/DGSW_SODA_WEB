import React, { useEffect } from 'react';
import PropTypes  from 'prop-types';
import BambooItem from '../BambooItem';
import style from './BambooTemplate.scss';
import classNames from 'classnames';

const BambooTemplate = ({ children }) => {

  return (
    <div className="BambooTemplate">
      {children}
    </div>
  );
};

BambooTemplate.propTypes = {
  children: PropTypes.any
};

export default BambooTemplate;