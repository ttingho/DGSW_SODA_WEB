import React, {useState, useCallback, useEffect, useRef } from 'react';
import QuestionDetailTemplate from 'components/QuestionDetail/QuestionDetailTemplate/QuestionDetailTemplate.js';
import { inject, observer } from 'mobx-react';
import ProTypes from 'prop-types';

const QuestionDetail = ({ store }) => {
  const [qnaData, setQnaData] = useState({});
  const [DetailTemplate, setDetailTemplate] = useState([]);
  const idx = 1;

  const { getQuestionDetail } = store.question;
  
  useEffect(async() => {
    async function fetchData() {
      await getQuestionDetail(idx).then((response) => {
        setQnaData(response.data);
      });
    }

    fetchData();
  }, []);

  return (
    <>
      <QuestionDetailTemplate qnaData={qnaData}/>
    </>
  );
};

QuestionDetail.proTypes = {
  store: ProTypes.object.isRequired,
};

export default inject('store')(observer(QuestionDetail));