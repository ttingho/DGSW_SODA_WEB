import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './InquiryNavBar.scss';
import { IoIosArrowDown } from 'react-icons/io';
import TokenVerification from 'lib/Token/TokenVerification';

const cx = classNames.bind(style);

const InquiryNavBar = ({ store, pageType, history }) => {
  /* category: 현재 클릭 된 카테고리 handleCategory: 카테고리를 바꿔주는 함수 */
  const { category, handleCategory } = store.inquiry;
  
  /* 카테고리를 눌렀는지 true false */
  const [isClickedCategory, setIsClickedCategory] = useState(false);

  /* 로그인되어 있는지 유무 */
  const isLogin = TokenVerification() !== 'empty' ? true : false;
  
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
    } else {
      handleCategory('전체');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('soda-token');
    localStorage.removeItem('soda-reToken');
    sessionStorage.removeItem('soda-token');
    sessionStorage.removeItem('soda-reToken');
    
    const ls = new SecureLS({ encodingType: 'aes' });

    ls.removeAll();

    history.push('/sign');
  };

  return (
    <div className={cx('InquiryNavBar')}>
      <div className={cx('InquiryNavBar-wrap')}>
        <div className={cx('InquiryNavBar-wrap-header')}>
          <div className={cx('InquiryNavBar-wrap-header-title')}>
            <span onClick={() => history.push('/')}>SODA</span>
          </div>
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
              <li className={cx('InquiryNavBar-wrap-content-category-ul-li', {'InquiryNavBar-wrap-content-category-ul-li-clicked': category === '기타 문의'})} onClick={() => clickCategory('기타 문의')}>기타 문의</li>
            </ul>
          </div>
          <div className={cx('InquiryNavBar-wrap-content-btns')}>
            <button className={cx('InquiryNavBar-wrap-content-btns-inquiry')} onClick={() => history.push('/question-write')}>문의하기</button>
            {
              isLogin ?
                <button className={cx('InquiryNavBar-wrap-content-btns-logout')} onClick={() => handleLogout()}>로그아웃</button>
                :
                <button className={cx('InquiryNavBar-wrap-content-btns-login')} onClick={() => history.push('/sign')}>로그인</button>
            }
          </div>
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