import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames/bind';
import style from './PageTemplate.scss';
import NavBar from '../NavBar';

const cx = classNames.bind(style);

const PageTemplate = ({ pageType, children }) => {
  return (
    <div className={cx('PageTemplate')}>
      <div className={cx('PageTemplate-header')}>
        <NavBar pageType={pageType} />
      </div>
      <div className={cx('PageTemplate-contents')}>
        {children}
      </div>
    </div>
  );
};

PageTemplate.propTypes = {
  pageType: PropTypes.oneOf([
    'bamboo',
    'soda'
  ]),
  children: PropTypes.node
};

export default PageTemplate;