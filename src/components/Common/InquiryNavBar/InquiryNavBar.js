import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './InquiryNavBar.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { withRouter } from 'react-router-dom';

const cx = classNames.bind(style);

const InquiryNavBar = ({ store, pageType, history }) => {
  /* category: 현재 클릭 된 카테고리 handleCategory: 카테고리를 바꿔주는 함수 */
  const { category, handleCategory } = store.inquiry;
  
  /* 카테고리를 눌렀는지 true false */
  const [isClickedCategory, setIsClickedCategory] = useState(false);
  
  const clickCategory = (category) => {
    if (pageType !== 'inquiry') {
      history.push('/inquiry');
    }
    handleCategory(category);
    setIsClickedCategory(!isClickedCategory);
  };

  useEffect(() => {
    if (pageType !== 'inquiry') {
      handleCategory('');
    }
  }, []);

  return (
    <div className={cx('InquiryNavBar')}>
      <div className={cx('InquiryNavBar-wrap')}>
        <div className={cx('InquiryNavBar-wrap-header')}>
          <span onClick={() => history.push('/')}>SODA</span>
        </div>
        <div className={cx('InquiryNavBar-wrap-content')}>
          <div className={cx('InquiryNavBar-wrap-content-category')}>
            <button className={cx('InquiryNavBar-wrap-content-category-btn')} 
              onClick={() => setIsClickedCategory(!isClickedCategory)}
            >
              카테고리
              <IoIosArrowDown className="down_icon"/>
            </button>
            <ul className={cx('InquiryNavBar-wrap-content-category-ul', {'InquiryNavBar-wrap-content-category-ul-hidden': !isClickedCategory})}>
              <li className={cx('InquiryNavBar-wrap-content-category-ul-li', {'InquiryNavBar-wrap-content-category-ul-li-clicked': category === '전체'})} onClick={() => clickCategory('전체')}>전체</li>
              <li className={cx('InquiryNavBar-wrap-content-category-ul-li', {'InquiryNavBar-wrap-content-category-ul-li-clicked': category === '대숲 버그 신고'})} onClick={() => clickCategory('대숲 버그 신고')}>대숲 버그 신고</li>
              <li className={cx('InquiryNavBar-wrap-content-category-ul-li', {'InquiryNavBar-wrap-content-category-ul-li-clicked': category === '소다 버그 신고'})} onClick={() => clickCategory('소다 버그 신고')}>소다 버그 신고</li>
              <li className={cx('InquiryNavBar-wrap-content-category-ul-li', {'InquiryNavBar-wrap-content-category-ul-li-clicked': category === '관리자 문의'})} onClick={() => clickCategory('관리자 문의')}>관리자 문의</li>
              <li className={cx('InquiryNavBar-wrap-content-category-ul-li', {'InquiryNavBar-wrap-content-category-ul-li-clicked': category === '기타'})} onClick={() => clickCategory('기타')}>기타</li>
            </ul>
          </div>
          <button className={cx('InquiryNavBar-wrap-content-inquiryBtn')} onClick={() => history.push('/question-write')}>문의하기</button>
        </div>
      </div>
    </div>
  );
};

InquiryNavBar.propTypes = {
  store: PropTypes.object,
  pageType: PropTypes.string,
  history: PropTypes.object
};

export default inject('store')(observer(withRouter(InquiryNavBar)));