import React from 'react';
import QuestionContainer from 'containers/QuestionWrite';
import PageTemplate from 'components/Common/PageTemplate';
import QuestionWriteContainer from 'containers/QuestionWrite/QuestionWriteContainer';

const QuestionWrite = () => {
  return (
    <>
      <PageTemplate pageType={'bamboo'}>
        <QuestionWriteContainer />
      </PageTemplate>
    </>
  );
};

export default QuestionWrite;