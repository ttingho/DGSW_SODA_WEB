import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SecureLS from 'secure-ls';
import InquiryTemplate from 'components/Inquiry/InquiryTemplate';
import InquiryItem from 'components/Inquiry/InquiryItem';
import IndexItem from 'components/Inquiry/IndexItem';
import usePending from 'lib/HookState/usePending';

const InquiryAdminContainer = ({ store, history }) => {
  const { 
    category,
    handleCategory,
    handlePageIndex,
    getAdminInquiry,
    getAdminCategoryInquiry,
    totalPage
  } = store.inquiry;

  const ls = new SecureLS({ encodingType: 'aes' });
  const { auth } = ls.get('user-info');  // 어드민인지 사용자인지

  const [itemList, setItemList] = useState([]);
  const [indexItemList, setIndexItemList] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  
  const handlePage = page => {
    setPageIndex(page);
  };

  const handleNext = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePrev = () => {
    setPageIndex(pageIndex - 1);
  };

  const handleDetail = idx => {
    localStorage.setItem('inquiry_idx', idx);
    history.push('/inquiry-detail');
  };

  async function fetchData() {
    if (auth === 0) { // 어드민 조회
      if (category === '전체') {  // 전체 조회
        await getAdminInquiry(14, pageIndex)
          .then((response) => {
            setItemList(response.question.map((data, index) => {
              return <InquiryItem item={data} handleDetail={handleDetail} key={index}/>;
            }));
          });
      } else {  // 카테고리 별 조회
        await getAdminCategoryInquiry(14, pageIndex)
          .then((response) => {
            setItemList(response.question.map((data, index) => {
              return <InquiryItem item={data} handleDetail={handleDetail} key={index}/>;
            }));
          });
      }
    }
  }

  const [isLoading, getData] = usePending(fetchData);

  useEffect(() => { // 관리자 아니일 때, 예외처리
    if (auth !== 0) {
      history.goBack(1);
    }
  }, [auth]);

  useEffect(() => {
    getData();
  }, [category, pageIndex]);

  useEffect(() => {   // pageNation
    if (totalPage === 1) {
      setIndexItemList(<IndexItem key={1} index={1} itemIndex={pageIndex} handlePage={handlePage} />);
    } else {
      let indexList = [];
      for (let i = 1; i <= totalPage; i++) {
        indexList.push(<IndexItem key={i} index={i} itemIndex={pageIndex} handlePage={handlePage}/>);
      }
      setIndexItemList(indexList);
    }
  }, [pageIndex, totalPage]);

  return (
    <>
      <InquiryTemplate
        category={category}
        handleCategory={handleCategory}
        handlePageIndex={handlePageIndex}
        handlePrev={handlePrev}
        handleNext={handleNext}
        totalPage={totalPage.length === 0 ? 0 : totalPage}
        indexItemList={indexItemList}
        itemIndex={pageIndex}
        isLoading={isLoading}
      >
        {
          itemList.length === 0 ?
            <div className="noData">문의가 없습니다.</div>
            : itemList        
        }
      </InquiryTemplate>
    </>
  );
};

InquiryAdminContainer.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(inject('store')(observer(InquiryAdminContainer)));