import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import QuestionDetailContainer from 'containers/QuestionDetail/QuestionDetail';

const QuestionWrite = () => {
  return (
    <>
      <PageTemplate pageType={'bamboo'}>
        <QuestionDetailContainer />
      </PageTemplate>
    </>
  );
};

export default QuestionWrite;