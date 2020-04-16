import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import InquiryContainer from 'containers/Inquiry';

const Inquiry = () => {
  return (
    <>
      <PageTemplate pageType={'inquiry'} url={'inquiry'}>
        <InquiryContainer />
      </PageTemplate>
    </>
  );
};

export default Inquiry;
