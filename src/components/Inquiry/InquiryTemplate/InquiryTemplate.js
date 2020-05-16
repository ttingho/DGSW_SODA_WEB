import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from './InquiryTemplate.scss';
import { IoIosArrowDown } from 'react-icons/io';
import TokenVerification from 'lib/Token/TokenVerification';
import PageLoading from 'components/Common/PageLoading';

const cx = classnames.bind(style);

const InquiryTemplate = ({
  isAdmin,
  category,
  handleCategory,
  handlePageIndex,
  handlePrev,
  handleNext,
  totalPage,
  indexItemList,
  itemIndex,
  children,
  isLoading 
}) => {

  /* 카테고리를 눌렀는지 true false */
  const [isClickedCategory, setIsClickedCategory] = useState(false);

  /* 토큰 유무 */
  const token = TokenVerification();

  const clickCategory = (category) => {
    handleCategory(category);
    setIsClickedCategory(!isClickedCategory);
    handlePageIndex(1); // 다른 카테고리 클릭 시 페이지 초기화
  };

  useEffect(() => {
    handleCategory('전체');
    handlePageIndex(1);
  }, []);
  
  return (
    <>
      {
        isLoading ? <PageLoading/>
          :
          <div className={cx('InquiryTemplate')}>
            <div className={cx('InquiryTemplate-header')}>
              <span className={cx('InquiryTemplate-header-title')}>
                {category}
                <span className={cx('InquiryTemplate-header-title-subTitle')}>
                  {
                    category === '전체' ? '전체 문의를 조회 합니다.'
                      : category === '서비스 문의' ? '서비스와 관련된 문의를 조회 합니다.'
                        : category === '관리자 문의' ? '관리자와 관련된 문의를 조회 합니다.'
                          : category === '개발자 QnA' ? '개발과 관련된 문의를 조회 합니다.'
                            : category === '대소고 QnA' ? '대소고와 관련된 문의를 조회 합니다.'
                              : ''
                  }
                </span>
              </span>
              <div className={cx('InquiryTemplate-header-category')}>
                <button className={cx('InquiryTemplate-header-category-btn')} 
                  onClick={() => setIsClickedCategory(!isClickedCategory)}
                >
                  {category}
                  <IoIosArrowDown className="down_icon"/>
                </button>
                <ul className={cx('InquiryTemplate-header-category-ul', {'InquiryTemplate-header-category-ul-hidden': !isClickedCategory})}>
                  <li className={cx('InquiryTemplate-header-category-ul-li', {'InquiryTemplate-header-category-ul-li-clicked': category === '전체'})} onClick={() => clickCategory('전체')}>전체</li>
                  <li className={cx('InquiryTemplate-header-category-ul-li', {'InquiryTemplate-header-category-ul-li-clicked': category === '서비스 문의'})} onClick={() => clickCategory('서비스 문의')}>서비스 문의</li>
                  <li className={cx('InquiryTemplate-header-category-ul-li', {'InquiryTemplate-header-category-ul-li-clicked': category === '관리자 문의'})} onClick={() => clickCategory('관리자 문의')}>관리자 문의</li>
                  <li className={cx('InquiryTemplate-header-category-ul-li', {'InquiryTemplate-header-category-ul-li-clicked': category === '개발자 QnA'})} onClick={() => clickCategory('개발자 QnA')}>개발자 QnA</li>
                  <li className={cx('InquiryTemplate-header-category-ul-li', {'InquiryTemplate-header-category-ul-li-clicked': category === '대소고 QnA'})} onClick={() => clickCategory('대소고 QnA')}>대소고 QnA</li>
                  {isAdmin || token === 'empty' ? <></>
                    : <li className={cx('InquiryTemplate-header-category-ul-li', {'InquiryTemplate-header-category-ul-li-clicked': category === '내가 작성한 문의'})} onClick={() => clickCategory('내가 작성한 문의')}>내가 작성한 문의</li>
                  }
                </ul>
              </div>
            </div>
            <div className={cx('InquiryTemplate-content')}>
              {children}
            </div>
            <div className={cx('InquiryTemplate-pagination', { 'InquiryTemplate-hidden': indexItemList.length === 0})}>
              <span className={cx('InquiryTemplate-pagination-prev', { 'InquiryTemplate-hidden': itemIndex === 1 })} onClick={() => handlePrev()}>이전</span>
              <div className={cx('InquiryTemplate-pagination-wrap')}>
                {
                  indexItemList.length > 7 ?
                    itemIndex > indexItemList.length - 3 ?
                      indexItemList.slice(indexItemList.length - 7, indexItemList.length)
                      : itemIndex < 5 ? indexItemList.slice(0, 7)
                        : indexItemList.slice(itemIndex - 4, itemIndex + 3)
                    : indexItemList
                }
              </div>
              <span className={cx('InquiryTemplate-pagination-next', { 'InquiryTemplate-hidden': itemIndex === totalPage })} onClick={() => handleNext()}>다음</span>
            </div>
          </div>
      }
    </>
  );
};

InquiryTemplate.propTypes = {
  isAdmin: PropTypes.bool,
  category: PropTypes.string,
  handleCategory: PropTypes.func,
  handlePageIndex: PropTypes.func,
  handlePrev: PropTypes.func,
  handleNext: PropTypes.func,
  totalPage: PropTypes.number,
  indexItemList: PropTypes.any,
  itemIndex: PropTypes.number,
  children: PropTypes.any,
  isLoading: PropTypes.bool
};

export default InquiryTemplate;