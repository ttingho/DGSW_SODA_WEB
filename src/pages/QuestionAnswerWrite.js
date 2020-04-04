import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import QuestionAnswerWriteContainer from 'containers/QuestionAnswerWrite/QuestionAnswerWrite';

const QuestionAnswerWrite = () => {
  return (
    <>
      <PageTemplate pageType={'bamboo'}>
        <QuestionAnswerWriteContainer />
      </PageTemplate>
    </>
  );
};

export default QuestionAnswerWrite;
