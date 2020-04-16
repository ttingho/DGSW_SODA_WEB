import React from 'react';
// import InquiryPageTemplate from 'components/Common/InquiryPageTemplate';
import PageTemplate from 'components/Common/PageTemplate';
import InquiryAdminContainer from 'containers/InquiryAdmin';

const Inquiry = () => {
  return (
    <>
      <PageTemplate pageType={'inquiry'} url={'inquiry-admin'}>
        <InquiryAdminContainer />
      </PageTemplate>
    </>
  );
};

export default Inquiry;
