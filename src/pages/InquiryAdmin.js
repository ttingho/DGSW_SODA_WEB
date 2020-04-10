import React from 'react';
import InquiryPageTemplate from 'components/Common/InquiryPageTemplate';
import InquiryAdminContainer from 'containers/InquiryAdmin';

const Inquiry = () => {
  return (
    <>
      <InquiryPageTemplate pageType={'inquiry'}>
        <InquiryAdminContainer />
      </InquiryPageTemplate>
    </>
  );
};

export default Inquiry;
