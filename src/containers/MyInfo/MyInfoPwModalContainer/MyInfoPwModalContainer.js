import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import SecureLS from 'secure-ls';
import sha512 from 'js-sha512';
import MyInfoPwModal from 'components/MyInfo/MyInfoPwModal';
import GroupingState from 'lib/HookState/GroupingState';

const MyInfoPwModalContainer = ({ store, setIsPwModal }) => {
  const { modifyMemberInfo } = store.member;
  const { checkMemberPw } = store.member;
  const { modal } = store.dialog;
  const [pw, setPw] = useState('');
  const [isPwValidate, setIsPwValidate] = useState(false);
  const [isPwValidateButton, setIsPwValidateButton] = useState(true);
  const [checkPw, setCheckPw] = useState('');
  const [checkPwAgain, setCheckPwAgain] = useState('');
  const [isCheckPw, setIsCheckPw] = useState(false);

  const handleModifyPw = async () => {

    if (!isPwValidate) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '기존 비밀번호 인증을 해주세요!'
      });

      return;
    } else if (checkPw.length === 0) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '빈칸을 채워주세요.'
      });

      return;
    }

    let data = {
      pw: sha512(checkPwAgain),
    };

    await modifyMemberInfo(data).
      then(async (response) => {
        await modal({
          title: 'Success!',
          stateType: 'success',
          contents: '비밀번호 변경 성공!',
          closeFunc: () => setIsPwModal(false),
        });
  
        return;
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
            contents: '비정상적인 접근!'
          });

          return;
        }
        if (status === 500) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '서버 에러! 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  const checkNewPwForm = async () => {
    if (checkPw.length === 0 || checkPwAgain === 0) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '빈칸을 채워주세요.'
      });

      return;
    } else if (checkPw !== checkPwAgain) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '비밀번호가 다릅니다.'
      });

      return;
    }  else if (!(/^[a-zA-Z0-9!@#$%^*+=-]{7,20}$/).test(checkPw)) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '비밀번호 형식을 지키세요!!'
      });

      return;
    } else {
      setIsCheckPw(true);
    }
  };

  const handleCheckUserPw = async () => {
    if (pw.length === 0) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '빈칸을 채워 주세요!'
      });

      return;
    }

    let data = {
      pw: sha512(pw),
    };

    await checkMemberPw(data).
      then(async (response) => {
        setIsPwValidate(true), setIsPwValidateButton(false);
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
            contents: '인증 실패!'
          });

          return;
        }

        if (status === 500) {
          await modal({
            title: 'Error!',
            stateType: 'error',
            contents: '서버 에러! 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  const isObj = {
    isPwValidate,
    isPwValidateButton,
    isCheckPw
  };
  
  return (
    <>
      <MyInfoPwModal
        setIsPwModal={setIsPwModal}
        pwObj={GroupingState('pw', pw, setPw)}
        checkPwObj={GroupingState('checkPw', checkPw, setCheckPw)}
        checkPwAgainObj={GroupingState('checkPwAgain', checkPwAgain, setCheckPwAgain)}
        isObj={isObj}
        handleCheckUserPw={handleCheckUserPw}
        checkNewPwForm={checkNewPwForm}
        handleModifyPw={handleModifyPw}
      />
    </>
  );
};

MyInfoPwModalContainer.propTypes = {
  store: PropTypes.object,
  setIsPwModal: PropTypes.func,
  handleModifyPw: PropTypes.func,
};

export default inject('store')(observer(MyInfoPwModalContainer));
