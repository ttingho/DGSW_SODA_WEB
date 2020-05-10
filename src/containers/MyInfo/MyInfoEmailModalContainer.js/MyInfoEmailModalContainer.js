import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import SecureLS from 'secure-ls';
import MyInfoEmailModal from 'components/MyInfo/MyInfoEmailModal';
import GroupingState from 'lib/HookState/GroupingState';

const MyInfoEmailModalContainer = ({ store, setIsEmailModal }) => {
  const { modifyMemberInfo } = store.member;
  const { getMyInfo } = store.member;
  const { modal } = store.dialog;
  const [email, setEmail] = useState('');

  const ls = new SecureLS({ encodingType: 'aes' });
  const userInfo = ls.get('user-info');

  const handleModifyEmail = async () => {

    if (email.length === 0) {
      await modal({
        title: 'Error!',
        stateType: 'error',
        contents: '빈칸을 채워 주세요!'
      });

      return;
    } else if (!(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i).test(email)) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '이메일 형식을 지켜주세요.'
      });
      return;
    }

    let data = {
      email,
    };

    await modifyMemberInfo(data).
      then(async (response) => {
        await modal({
          title: 'Success!',
          stateType: 'success',
          contents: '이메일이 성공적으로 변경 되었습니다!',
          closeFunc: () => { 
            setIsEmailModal(false);
            getMyInfo();
          }
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

  return (
    <>
      <MyInfoEmailModal
        setIsEmailModal={setIsEmailModal}
        emailObj={GroupingState('email', email, setEmail)}
        handleModifyEmail={handleModifyEmail}
      />
    </>
  );
};

MyInfoEmailModalContainer.propTypes = {
  store: PropTypes.object,
  setIsEmailModal: PropTypes.func,
  handleModifyEmail: PropTypes.func,
};

export default inject('store')(observer(MyInfoEmailModalContainer));