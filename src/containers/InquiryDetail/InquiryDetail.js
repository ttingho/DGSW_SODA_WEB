import React, { useEffect, useState } from 'react';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import TokenVerification from 'lib/Token/TokenVerification';
import GroupingState from 'lib/HookState/GroupingState';
import InquiryDetailTemplate from 'components/InquiryDetail/InquiryDetailTemplate';
import usePending from 'lib/HookState/usePending';
import PageLoading from 'components/Common/PageLoading';
import useStores from 'lib/HookState/useStore';

const InquiryDetail = observer(({ history }) => {
  const blank_pattern = /^\s+|\s+$/g;

  const { store } = useStores();

  const ls = new SecureLS({ encodingType: 'aes' });

  const idx = localStorage.getItem('inquiry_idx');

  // 토큰 검사
  const token = TokenVerification();

  // 유저 정보
  const userInfo = ls.get('user-info');

  const { modal } = store.dialog;

  const { inquiry, answer, isComplate, getInquiryDetail, requestInquiryAnswer, requestDeleteInquiryWrite, requestPutInquiryWrite, requestPutInquiryAnswer, requestDeleteInquiryAnswer } = store.inquiry;

  // Inquiry State
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContents, setInquiryContents] = useState('');
  const [images, setImages] = useState([]);
  const [isInquiryMore, setIsInquiryMore] = useState(false);
  const [isInquiryType, setIsInquiryType] = useState('READ_ONLY');

  // Answer State
  const [answerTitle, setAnswerTitle] = useState('');
  const [answerContents, setAnswerContents] = useState('');
  const [isAnswerMore, setIsAnswerMore] = useState(false);
  const [isAnswerType, setIsAnswerType] = useState('READ_ONLY');

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

  const handleIsMore = prop => {
    if (prop === 'inquiry') setIsInquiryMore(!isInquiryMore);

    if (prop === 'answer') setIsAnswerMore(!isAnswerMore);
  };

  const handleIsType = (type, prop) => {
    if (type === 'inquiry') {
      setIsInquiryType(prop);
      setIsInquiryMore(false);
    }

    if (type === 'answer') {
      setIsAnswerType(prop);
      setIsAnswerMore(false);
    }

    handleInitialState();
  };

  const handleAnswer = async () => {
    const data = {
      title: answerTitle,
      contents: answerContents,
      questionIdx: idx,
    };

    if (answerTitle.length === 0 || answerContents.length === 0) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '입력 칸이 비워있습니다.'
      });

      return;
    }

    if (answerTitle.replace( blank_pattern, '' ) === '' || answerContents.replace( blank_pattern, '' ) === '') {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '공백만 입력되었습니다.'
      });

      return;
    }

    await requestInquiryAnswer(data).
      then(async (response) => {
        if (response.status === 200) {
          modal({
            title: 'Success!',
            stateType: 'success',
            contents: '답변을 작성했습니다.'
          });

          setIsAnswerType('READ_ONLY');
          
          setIsAnswerMore(false);
        }
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

  const handlePutInquiry = async () => {
    const data = {
      idx,
      title: inquiryTitle,
      contents: inquiryContents,
      picture: null
    };

    if (inquiryTitle.length === 0 || inquiryContents.length === 0) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '입력 칸이 비워있습니다.'
      });

      return;
    }

    if (inquiryTitle.replace( blank_pattern, '' ) === '' || inquiryContents.replace( blank_pattern, '' ) === '') {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '공백만 입력되었습니다.'
      });

      return;
    }

    await requestPutInquiryWrite(data)
      .then(async (response) => {
        if (response.status === 200) {
          await modal({
            title: 'Success!',
            stateType: 'success',
            contents: '해당 문의가 수정되었습니다.',
          });

          setIsInquiryType('READ_ONLY');

          setIsInquiryMore(false);
        }
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 400) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '존재하지 않는 문의이거나 잘못된 양식입니다.'
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

  const handlePutAnswer = async () => {
    const data = {
      idx: answer.idx,
      title: answerTitle,
      contents: answerContents,
    };

    if (answerTitle.length === 0 || answerContents.length === 0) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '입력 칸이 비워있습니다.'
      });

      return;
    }

    if (answerTitle.replace( blank_pattern, '' ) === '' || answerContents.replace( blank_pattern, '' ) === '') {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '공백만 입력되었습니다.'
      });

      return;
    }

    await requestPutInquiryAnswer(idx, data)
      .then(async (response) => {
        if (response.status === 200) {
          await modal({
            title: 'Success!',
            stateType: 'success',
            contents: '해당 답변이 수정되었습니다.',
          });

          setIsAnswerType('READ_ONLY');

          setIsAnswerMore(false);
        }
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 400) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '존재하지 않는 답변이거나 잘못된 양식입니다.'
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

  const handleDeleteInquiry = async () => {
    await requestDeleteInquiryWrite(idx)
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

  const handleDeleteAnswer = async () => {
    if (answer === null) return;

    await requestDeleteInquiryAnswer(idx, answer.idx)
      .then(async (response) => {
        if (response.status === 200) {
          await modal({
            title: 'Success!',
            stateType: 'success',
            contents: '해당 답변이 삭제되었습니다.'
          });

          setIsAnswerMore(false);
        }
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 400) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '존재하지 않는 답변입니다.'
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
  }, [inquiry, answer, isComplate]);

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
            inquiryTitleObj={GroupingState('inquiryTitle', inquiryTitle, setInquiryTitle)}
            inquiryContentsObj={GroupingState('inquiryContents', inquiryContents, setInquiryContents)}
            answerTitleObj={GroupingState('answerTitle', answerTitle, setAnswerTitle)}
            answerContentsObj={GroupingState('answerContents', answerContents, setAnswerContents)}
            isInquiryMore={isInquiryMore}
            isInquiryType={isInquiryType}
            isAnswerMore={isAnswerMore}
            isAnswerType={isAnswerType}
            images={images}
            handleAnswer={handleAnswer}
            handlePutInquiry={handlePutInquiry}
            handlePutAnswer={handlePutAnswer}
            handleDeleteInquiry={handleDeleteInquiry}
            handleDeleteAnswer={handleDeleteAnswer}
            handleIsMore={handleIsMore}
            handleIsType={handleIsType}
            isComplate={isComplate}
          />
      }
    </>
  );
});

InquiryDetail.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(InquiryDetail);
