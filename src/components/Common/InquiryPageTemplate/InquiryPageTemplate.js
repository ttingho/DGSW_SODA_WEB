import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames/bind';
import style from './InquiryPageTemplate.scss';
import InquiryNavBar from '../InquiryNavBar';

const cx = classNames.bind(style);

const InquiryPageTemplate = ({ pageType, children }) => {
  return (
    <div className={cx('InquiryPageTemplate')}>
      <div className={cx('InquiryPageTemplate-header')}>
        <InquiryNavBar pageType={pageType}/>
      </div>
      <div className={cx('InquiryPageTemplate-contents')}>
        {children}
      </div>
      <div className={cx('InquiryPageTemplate-footer')}>
        
      </div>
    </div>
  );
};

InquiryPageTemplate.propTypes = {
  pageType: PropTypes.string,
  children: PropTypes.any
};

export default InquiryPageTemplate;