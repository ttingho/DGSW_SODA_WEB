import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './BambooAdminTemplate.scss';

const cx = classNames.bind(style);

const BambooAdminTemplate = ({ children }) => {
  return (
    <div className={cx('BambooAdminTemplate')}>
      
    </div>
  );
};

BambooAdminTemplate.propTypes = {
  children: PropTypes.array
};

export default BambooAdminTemplate;
