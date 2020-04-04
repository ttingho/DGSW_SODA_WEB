import React from 'react';
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