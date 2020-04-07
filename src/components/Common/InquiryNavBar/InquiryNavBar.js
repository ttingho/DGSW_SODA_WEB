import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './InquiryNavBar.scss';
import { withRouter } from 'react-router-dom';

const cx = classNames.bind(style);

const InquiryNavBar = ({ history }) => {
  return (
    <div className={cx('InquiryNavBar')}>
      <div className={cx('InquiryNavBar-wrap')}>
        <div className={cx('InquiryNavBar-wrap-header')}>
          <span onClick={() => history.push('/')}>SODA</span>
        </div>
        <div className={cx('InquiryNavBar-wrap-content')}>

        </div>
      </div>
    </div>
  );
};

InquiryNavBar.propTypes = {
  history: PropTypes.object
};

export default withRouter(InquiryNavBar);