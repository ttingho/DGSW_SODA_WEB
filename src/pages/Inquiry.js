import React from 'react';
import InquiryPageTemplate from 'components/Common/InquiryPageTemplate';
import InquiryContainer from 'containers/Inquiry';

const Inquiry = () => {
  return (
    <>
      <InquiryPageTemplate>
        <InquiryContainer />
      </InquiryPageTemplate>
    </>
  );
};

export default Inquiry;
