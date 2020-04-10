import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from './InquiryItem.scss';
import DateFormat from 'lib/Common/DateFormat';
import { FaRegCheckCircle, FaRegQuestionCircle } from 'react-icons/fa';

const cx = classnames.bind(style);

const InquiryItem = ({ item, handleDetail }) => {
  const { idx, title, contents, memberId, category, joinDate, isComplate } = item;

  return (
    <div className={cx('InquiryItem')}>
      <div className={cx('InquiryItem-top')}>
        <span onClick={() => handleDetail(idx)}>{title}</span>
      </div>
      <div className={cx('InquiryItem-mid')}>
        <div className={cx('InquiryItem-mid-wrap')}>
          <span>{contents}</span>
        </div>
        <div className={cx('InquiryItem-mid-state')}>
          {isComplate === 0
            ? 
            <div className={cx('InquiryItem-mid-state-wrap')}>
              <FaRegQuestionCircle className="wait"/>
              답변 기다리는중
            </div>
            :
            <div className={cx('InquiryItem-mid-state-wrap')}>
              <FaRegCheckCircle className="success"/>
              답변 완료
            </div>
          }
        </div>
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