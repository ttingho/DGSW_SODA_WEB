import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from './InquiryTemplate.scss';
import PageLoading from 'components/Common/PageLoading';

const cx = classnames.bind(style);

const InquiryTemplate = ({ category, handlePrev, handleNext, totalPage, indexItemList, itemIndex, children, isLoading }) => {
  return (
    <>
      {
        isLoading ? <PageLoading/>
          :
          <div className={cx('InquiryTemplate')}>
            <div className={cx('InquiryTemplate-header')}>
              {category}
            </div>
            <div className={cx('InquiryTemplate-content')}>
              {children}
            </div>
            <div className={cx('InquiryTemplate-footer', {'InquiryTemplate-hidden': totalPage <= 1})}>
              <span className={cx('InquiryTemplate-footer-prev', { 'InquiryTemplate-hidden': itemIndex === 1 })} onClick={() => handlePrev()}>이전</span>
              {
                indexItemList.length > 7 ?
                  indexItemList.slice(itemIndex, itemIndex + 7) :
                  indexItemList
              }
              <span className={cx('InquiryTemplate-footer-next', { 'InquiryTemplate-hidden': itemIndex === totalPage })} onClick={() => handleNext()}>다음</span>
            </div>
          </div>
      }
    </>
  );
};

InquiryTemplate.propTypes = {
  category: PropTypes.string,
  handlePrev: PropTypes.func,
  handleNext: PropTypes.func,
  totalPage: PropTypes.number,
  indexItemList: PropTypes.any,
  itemIndex: PropTypes.number,
  children: PropTypes.any,
  isLoading: PropTypes.bool
};

export default InquiryTemplate;