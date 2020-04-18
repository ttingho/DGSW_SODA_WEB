import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import InquiryWriteContainer from 'containers/InquiryWrite/InquiryWriteContainers';

const QuestionWrite = () => {
  return (
    <>
      <PageTemplate pageType={'bamboo'}>
        <InquiryWriteContainer/>
      </PageTemplate>
    </>
  );
};

export default QuestionWrite;