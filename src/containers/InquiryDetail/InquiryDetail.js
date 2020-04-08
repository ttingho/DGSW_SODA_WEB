import React, { useEffect, useState } from 'react';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import TokenVerification from 'lib/Token/TokenVerification';
import GroupingState from 'lib/HookState/GroupingState';
import InquiryDetailTemplate from 'components/InquiryDetail/InquiryDetailTemplate';
import usePending from 'lib/HookState/usePending';
import PageLoading from 'components/Common/PageLoading';

const InquiryDetail = ({ store, history }) => {
  const ls = new SecureLS({ encodingType: 'aes' });

  const idx = 5;

  // 토큰 검사
  const token = TokenVerification();

  // 유저 정보
  const userInfo = ls.get('user-info');

  const { modal } = store.dialog;

  const { inquiryDetail, getInquiryDetail, requestInquiryAnswer } = store.inquiry;

  // Inquiry State
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContents, setInquiryContents] = useState('');
  const [images, setImages] = useState([]);

  // Answer State
  const [answerTitle, setAnswerTitle] = useState('');
  const [answerContents, setAnswerContents] = useState('');

  const requestInitialData = async () => {
    await getInquiryDetail(idx)
      .then(response => {
        setInquiryTitle(response.data.question.title);
        setInquiryContents(response.data.question.contents);
      });
  };

  const handleQuesionAnswer = async () => {
    const data = {
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

  const [isLoading, getData] = usePending(requestInitialData);

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
      {
        isLoading ?
          <PageLoading /> :
          <InquiryDetailTemplate
            question={inquiryDetail.question}
            answer={inquiryDetail.answer}
            userType={userInfo.auth}
          />
      }
    </>
  );
};

InquiryDetail.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default inject('store')(observer(withRouter(InquiryDetail)));
