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

  const idx = localStorage.getItem('inquiry_idx');

  // 토큰 검사
  const token = TokenVerification();

  // 유저 정보
  const userInfo = ls.get('user-info');

  const { modal } = store.dialog;

  const { inquiry, answer, isComplate, getInquiryDetail, requestInquiryAnswer, requestDeleteInquiryWrite } = store.inquiry;

  // Inquiry State
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContents, setInquiryContents] = useState('');
  const [images, setImages] = useState([]);

  // Answer State
  const [answerTitle, setAnswerTitle] = useState('');
  const [answerContents, setAnswerContents] = useState('');

  const handleInitialState = () => {
    if (inquiry !== null) {
      setInquiryTitle(inquiry.title);
      setInquiryContents(inquiry.contents);

      if (inquiry.picture && inquiry.picture.length !== 0) {
        const list  = [];

        for (let i = 0; i < inquiry.picture.length; i++) {
          list.push(inquiry.picture[i].url);
        }

        setImages(list);
      }
    }
    
    if (answer !== null) {
      setAnswerTitle(answer.title);
      setAnswerContents(answer.contents);
    }

    if (answer === null) {
      setAnswerTitle('');
      setAnswerContents('');
    }
  };

  const requestInitialData = async () => {
    await getInquiryDetail(idx)
      .then(response => {
        setInquiryTitle(response.data.question.title);
        setInquiryContents(response.data.question.contents);
      });
  };

  const handleAnswer = () => {
    const data = {
      title: answerTitle,
      contents: answerContents,
      questionIdx: idx,
    };

    if (answerContents.length === 0 || answerTitle.length === 0) {
      modal({
        title: 'Error!',
        stateType: 'error',
        contents: '빈칸을 채워 주세요!'
      });

      return;
    }

    requestInquiryAnswer(data).
      then(async (response) => {
        modal({
          title: 'Success!',
          stateType: 'success',
          contents: '문의가 성공적으로 업로드 되었습니다! 관리자의 답변을 기다려 주세요.'
        });
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 400) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '양식이 맞지 않아요!'
          });

          return;
        }

        if (status === 403) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '이미 답변이 작성되었어요!'
          });

          return;
        }
        
        if (status === 500) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '홀리 쉣 서버 에러네요 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  const handleDeleteInquiry = () => {
    requestDeleteInquiryWrite(idx)
      .then(async (response) => {
        if (response.status === 200) {
          await modal({
            title: 'Success!',
            stateType: 'success',
            contents: '해당 문의가 삭제되었습니다.',
            closeFunc: () => history.goBack(1)
          });
        }
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 400) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '존재하지 않는 문의입니다.'
          });

          return;
        }

        if (status === 403) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '권한 없음.'
          });

          return;
        }
        
        if (status === 500) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: 'Server Error..'
          });

          return;
        }
      });
  };

  const [isLoading, getData] = usePending(requestInitialData);

  useEffect(() => {
    var isEmpty = function(value){
      if( value == '' || value == null || value == undefined || ( value != null && typeof value == 'object' && !Object.keys(value).length ) ){
        return true;
      }else{
        return false;
      }
    };

    if (!isEmpty(inquiry) || !isEmpty(answer)) {
      handleInitialState();
    }
  }, [isComplate]);

  useEffect(() => {
    if (token === 'empty') {
      history.push('/sign');
      
      return;
    }

    if (idx === null) {
      history.goBack(1);

      return;
    }

    getData();
  }, []);
  
  return (
    <>
      {
        isLoading ?
          <PageLoading /> :
          <InquiryDetailTemplate
            question={inquiry}
            answer={answer}
            userType={userInfo.auth}
            memberId={userInfo.memberId}
            answerTitleObj={GroupingState('answerTitle', answerTitle, setAnswerTitle)}
            answerContentsObj={GroupingState('answerContents', answerContents, setAnswerContents)}
            handleAnswer={handleAnswer}
            handleDeleteInquiry={handleDeleteInquiry}
          />
      }
    </>
  );
};

InquiryDetail.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default inject('store')(withRouter(observer(InquiryDetail)));
