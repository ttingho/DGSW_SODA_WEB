import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import InquiryWriteContainer from 'containers/InquiryWrite/InquiryWriteContainers';

const QuestionWrite = () => {
  return (
    <>
      <PageTemplate url={'inquiry-write'} pageType={'inquiry'}>
        <InquiryWriteContainer/>
      </PageTemplate>
    </>
  );
};

export default QuestionWrite;
