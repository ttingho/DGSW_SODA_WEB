import React, {useState, useCallback, useEffect, useRef } from 'react';
import QuestionDetailTemplate from 'components/QuestionDetail/QuestionDetailTemplate/QuestionDetailTemplate.js';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

const QuestionDetail = ({ store }) => {
  const { detailQuestion, getQuestionDetail } = store.question;

  const idx = 2;
  
  useEffect(() => {
    async function fetchData() {
      await getQuestionDetail(idx);
    }

    fetchData();
  }, []);

  return (
    <>
      <QuestionDetailTemplate question={detailQuestion.question} answer={detailQuestion.answer} />
    </>
  );
};

QuestionDetail.propTypes = {
  store: PropTypes.object.isRequired,
};

export default inject('store')(observer(QuestionDetail));