import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from './InquiryItem.scss';
import DateFormat from 'lib/Common/DateFormat';

const cx = classnames.bind(style);

const InquiryItem = ({ item, handleDetail }) => {
  const { idx, title, contents, memberId, category, joinDate } = item;

  return (
    <div className={cx('InquiryItem')}>
      <div className={cx('InquiryItem-top')}>
        <span onClick={() => handleDetail(idx)}>{title}</span>
      </div>
      <div className={cx('InquiryItem-mid')}>
        <span>{contents}</span>
      </div>
      <div className={cx('InquiryItem-bottom')}>
        <span>{category}</span>
        <span>{DateFormat(joinDate, 'YYYY-MM-DD')}</span>
        <span>작성자: {memberId}</span>
      </div>
    </div>
  );
};

InquiryItem.propTypes = {
  item: PropTypes.object,
  handleDetail: PropTypes.func
};

export default InquiryItem;