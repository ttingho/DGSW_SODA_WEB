import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import SignTemplate from 'components/Sign/SignTemplate';
import SignInContainer from 'containers/Sign/SignIn';
import SignUpContainer from 'containers/Sign/SignUp';
import EmailModalContainer from 'containers/Sign/SignUp/EmailModal';
import GroupingState from 'lib/HookState/GroupingState';

const SignContainer = ({ store }) => {

  const { handleSignIn, handleSignUp } = store.sign;

  const { modal } = store.dialog;

  /* Sign Inputs */
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  /* email parts */
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  
  /* 로그인 유지 */
  const [keepLogin, setKeepLogin] = useState(false);

  /* true면 SignIn(로그인) false면 SignUp(회원가입) */
  const [signType, setSignType] = useState(true);

  /* 회원가입 페이지 이동 */
  const [page, setPage] = useState(1);

  const handleResetInputValue = () => {
    setId('');
    setPw('');
    setName('');
    setProfileImage({});
    setEmail('');
    setPhone('');
    setNickName('');
    setPage(1);
  };

  const changeSign = () => {
    handleResetInputValue();
    setSignType(!signType);
  };

  return (
    <>
      <SignTemplate signType={signType} changeSign={changeSign}>
        <SignInContainer
          signType={signType}
          idObj={GroupingState('id', id, setId)}
          pwObj={GroupingState('pw', pw, setPw)}
          keepLoginObj={GroupingState('keepLogin', keepLogin, setKeepLogin)}
          handleSignIn={handleSignIn}
          modal={modal}
        />  
        <SignUpContainer
          signType={signType}
          idObj={GroupingState('id', id, setId)}
          pwObj={GroupingState('pw', pw, setPw)}
          checkPwObj={GroupingState('checkPw', checkPw, setCheckPw)}
          nameObj={GroupingState('name', name, setName)}
          emailObj={GroupingState('email', email, setEmail)}
          phoneObj={GroupingState('phone', phone, setPhone)}
          nickNameObj={GroupingState('nickName', nickName, setNickName)}
          profileImageObj={GroupingState('profileImage', profileImage, setProfileImage)}
          pageObj={GroupingState('page', page, setPage)}
          setIsEmailModal={setIsEmailModal}
          modal={modal}
        />
      </SignTemplate>
      {
        isEmailModal
          ? 
          <EmailModalContainer 
            emailCodeObj={GroupingState('emailCode', emailCode, setEmailCode)}
            setIsEmailModal={setIsEmailModal}
            modal={modal}
          />
          : <></>
      }
    </>
  );
};

SignContainer.propTypes = {
  store: PropTypes.any
};

export default inject('store')(observer(SignContainer));
