import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames/bind';
import style from './InquiryPageTemplate.scss';
import InquiryNavBar from '../InquiryNavBar';

const cx = classNames.bind(style);

const InquiryPageTemplate = ({ children }) => {
  return (
    <div className={cx('InquiryPageTemplate')}>
      <div className={cx('InquiryPageTemplate-header')}>
        <InquiryNavBar/>
      </div>
      <div className={cx('InquiryPageTemplate-contents')}>
        {children}
      </div>
    </div>
  );
};

InquiryPageTemplate.propTypes = {
  children: PropTypes.any
};

export default InquiryPageTemplate;