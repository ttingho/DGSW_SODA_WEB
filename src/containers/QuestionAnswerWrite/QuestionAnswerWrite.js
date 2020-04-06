import React, {useState, useCallback, useEffect, useRef } from 'react';
import AnswerWriteTemplate from 'components/AnswerWrite/AnswerWriteTemplate/AnswerWriteTemplate.js';
import { inject, observer } from 'mobx-react';
import TokenVerification from 'lib/Token/TokenVerification';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import GroupingState from 'lib/HookState/GroupingState';

const QuestionAnswerWrite = ({ store, history }) => {
  const [answerTitle, setAnswerTitle] = useState('');
  const [answerContents, setAnswerContents] = useState('');
  const [questionData, setQuestionData] = useState({});
  const { detailAnswerQuestion, getQuestionDetail } = store.question;
  const idx = 2;

  const { modal } = store.dialog;
  const { postQuestionAnswer } = store.question;

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const token = TokenVerification();

  const handleQuesionAnswer = async () => {
    let data;

    data = {
      title: answerTitle,
      contents: answerContents,
      questionIdx: idx,
    };

    if (answerContents.length === 0 || answerTitle.length === 0) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '빈칸을 채워 주세요!'
      });

      return;
    }

    await postQuestionAnswer(data).
      then(async (response) => {
        await modal({
          title: 'Success!',
          stateType: 'success',
          contents: '문의가 성공적으로 업로드 되었습니다! 관리자의 답변을 기다려 주세요.'
        });
      })
      .catch(async (error) => {
        const { status } = error.response;

        if (status === 400) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '양식이 맞지 않아요!'
          });

          return;
        }

        if (status === 403) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '이미 답변이 작성되었어요!'
          });

          return;
        }
        
        if (status === 500) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '홀리 쉣 서버 에러네요 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };


  const checkAdminAuth = async () => {
    if (token ==='empty' || userInfo === null || userInfo.auth !== 0) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '답변 작성은 관리자만 작성가능 합니다!',
      });
      

      history.goBack(1);

      return;
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await getQuestionDetail(idx);
    }

    fetchData();
  }, []);
  
  return (
    <AnswerWriteTemplate 
      contentsObj={GroupingState('answerContents', answerContents, setAnswerContents)}
      titleObj={GroupingState('answerTitle', answerTitle, setAnswerTitle)}
      idx={idx}
      handleQuesionAnswer={handleQuesionAnswer}
      questionData={detailAnswerQuestion}
    />
  );
};

QuestionAnswerWrite.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default inject('store')(observer(withRouter(QuestionAnswerWrite)));