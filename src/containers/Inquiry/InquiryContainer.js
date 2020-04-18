import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenVerification from 'lib/Token/TokenVerification';
import InquiryTemplate from 'components/Inquiry/InquiryTemplate';
import InquiryItem from 'components/Inquiry/InquiryItem';
import IndexItem from 'components/Inquiry/IndexItem';
import usePending from 'lib/HookState/usePending';

const InquiryContainer = ({ store, history }) => {
  const { 
    category,
    handleCategory,
    pageIndex,
    handlePageIndex,
    getInquiry,
    getCategoryInquiry,
    totalPage
  } = store.inquiry;

  const { modal } = store.dialog;

  const [itemList, setItemList] = useState([]);
  const [indexItemList, setIndexItemList] = useState([]);
  const token = TokenVerification();
  
  const handlePage = page => {
    handlePageIndex(page);
  };

  const handleNext = () => {
    handlePageIndex(pageIndex + 1);
  };

  const handlePrev = () => {
    handlePageIndex(pageIndex - 1);
  };

  const handleDetail = idx => {
    if (token === 'empty') {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '상세내용은 로그인 후 이용 가능 합니다!'
      });
      
      return;
    }
    localStorage.setItem('inquiry_idx', idx);
    history.push('/inquiry-detail');
  };

  async function fetchData() {
    if (category === '전체') {  // 전체 조회
      await getInquiry(10, pageIndex)
        .then((response) => {
          setItemList(response.question.map((data, index) => {
            return <InquiryItem item={data} handleDetail={handleDetail} key={index}/>;
          }));
        });
    } else {  // 카테고리 별 조회
      await getCategoryInquiry(10, pageIndex)
        .then((response) => {
          setItemList(response.question.map((data, index) => {
            return <InquiryItem item={data} handleDetail={handleDetail} key={index}/>;
          }));
        });
    }
  }

  const [isLoading, getData] = usePending(fetchData);

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

InquiryContainer.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(inject('store')(observer(InquiryContainer)));