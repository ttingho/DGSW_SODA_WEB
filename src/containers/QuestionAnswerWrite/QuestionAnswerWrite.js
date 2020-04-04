import React, {useState, useCallback, useEffect, useRef } from 'react';
import AnswerWriteTemplate from 'components/AnswerWrite/AnswerWriteTemplate/AnswerWriteTemplate.js';
import { inject, observer } from 'mobx-react';
import TokenVerification from 'lib/Token/TokenVerification';
import SecureLS from 'secure-ls';
import ProTypes from 'prop-types';
import GroupingState from 'lib/HookState/GroupingState';

const QuestionAnswerWrite = ({ store }) => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [questionData, setQuestionData] = useState({});
  const idx = 1;

  const { modal } = store.dialog;
  const { postQuestionAnswer } = store.question;

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const token = TokenVerification();

  const getQuestionData = useCallback(async () => {
    console.log('test');
    
    const { question } = store;

    const data = await question.getQuestionDetail(idx);
    setQuestionData(data.data.question[0]);
  }, []);


  const handleQuesionAnswer = async () => {
    let data;

    if (contents.length === 0 || title.length === 0) {
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
        
        if (status === 500) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '홀리 쉣 서버 에러네요 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  }


  const checkAdminAuth = async () => {
    if (token ==='empty' || userInfo === null) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '건의사항 작성은 로그인 후 이용 가능 합니다!',
      });

      history.goBack(1);

      return;
    }
  }

  useEffect(() => {
    checkAdminAuth();
    getQuestionData();
  }, []);
  
  return (
    <AnswerWriteTemplate 
      contentsObj={GroupingState('contents', contents, setContents)}
      titleObj={GroupingState('title', title, setTitle)}
      idx={idx}
      handleQuesionAnswer={handleQuesionAnswer}
      questionData={questionData}
    />
  );
}

QuestionAnswerWrite.proTypes = {
  store: ProTypes.object.isRequired,
};

export default inject('store')(observer(QuestionAnswerWrite));