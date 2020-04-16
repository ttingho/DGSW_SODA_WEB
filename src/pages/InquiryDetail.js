import React from 'react';
import InquiryPageTemplate from 'components/Common/InquiryPageTemplate';
import PageTemplate from 'components/Common/PageTemplate';
import InquiryDetailContainer from 'containers/InquiryDetail';

const InquiryDetail = () => {
  return (
    <PageTemplate pageType={'inquiry'} url={'inquiry-detail'}>
      <InquiryDetailContainer />
    </PageTemplate>
  );
};

export default InquiryDetail;
