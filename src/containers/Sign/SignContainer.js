import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TokenVerification from 'lib/Token/TokenVerification';
import SignTemplate from 'components/Sign/SignTemplate';
import SignInContainer from 'containers/Sign/SignIn';
import SignUpContainer from 'containers/Sign/SignUp';
import EmailModalContainer from 'containers/Sign/SignUp/EmailModal';
import GroupingState from 'lib/HookState/GroupingState';

const SignContainer = ({ store, history }) => {
  const { isModal, isCertified, handleSignIn, handleSignUp, handleIdCheck, handleEmail, handleEmailCode, handleisCertified, handleIsSignModal } = store.sign;
  const { getMyInfo } = store.member;
  const { uploadImage } = store.upload;
  const { modal } = store.dialog;

  /* Sign Inputs */
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  /* id check 
  0: 처음 멘트(초기화) 1: 사용 가능 아이디 2: 중복된 아이디 3: 올바르지 않은 형식*/
  const [idCheck, setIdCheck] = useState(0);
  
  /* pwCheck
  0: 처음 초기화 상태 1: 비밀번호가 같을 때 2: 비밀번호가 같지 않을 때 3: 비멀번호 형식이 틀릴 경우*/
  const [isRightPw, setIsRightPw] = useState(0);

  /* email parts */
  const [isEmailModal, setIsEmailModal] = useState(false);  // email 모달
  const [emailCode, setEmailCode] = useState(''); // 입력할 코드
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  
  /* 로그인 유지 */
  const [keepLogin, setKeepLogin] = useState(false);

  /* true면 SignIn(로그인) false면 SignUp(회원가입) */
  const [signType, setSignType] = useState(true);

  /* 회원가입 페이지 이동
  1: id, pw 2: name, email 3: emailCheck 4: profileImage */
  const [page, setPage] = useState(1);

  const handleResetInputValue = () => {
    setId('');
    setPw('');
    setCheckPw('');
    setName('');
    setProfileImage(null);
    setEmail('');
    setPhone('');
    setIsCheckedEmail(false);
    setIdCheck(0);
    setIsRightPw(0);
    setPage(1);
  };

  const changeSign = () => {
    handleResetInputValue();
    setSignType(!signType);
  };

  // const handleCertification = async() => {
  //   let data = {
  //     code: emailCode,
  //     email: email
  //   };

  //   await handleEmailCode(data)
  //     .then((response) => {
  //       setIsCheckedEmail(true);
  //     }).catch((error) => {
  //       const { status } = error.response.data;

  //       if (status === 400) {
  //         modal({
  //           title: 'Warning!',
  //           stateType: 'warning',
  //           contents: '코드를 입력해주세요.'
  //         });
  //         return;
  //       } 
  //       if (status === 403) {
  //         modal({
  //           title: 'Warning!',
  //           stateType: 'warning',
  //           contents: '올바른 검증 코드를 입력해주세요.'
  //         });
  //         return;
  //       }
  //     });
  // };

  return (
    <>
      <SignTemplate isModal={isModal} handleIsSignModal={handleIsSignModal} signType={signType} changeSign={changeSign} page={page}>
        <SignInContainer
          signType={signType}
          changeSign={changeSign}
          idObj={GroupingState('id', id, setId)}
          pwObj={GroupingState('pw', pw, setPw)}
          keepLoginObj={GroupingState('keepLogin', keepLogin, setKeepLogin)}
          handleSignIn={handleSignIn}
          handleIsSignModal={handleIsSignModal}
          handleResetInputValue={handleResetInputValue}
          getMyInfo={getMyInfo}
          modal={modal}
        />  
        <SignUpContainer
          signType={signType}
          isCertified={isCertified}
          changeSign={changeSign}
          idObj={GroupingState('id', id, setId)}
          idCheckObj={GroupingState('idCheck', idCheck, setIdCheck)}
          pwObj={GroupingState('pw', pw, setPw)}
          checkPwObj={GroupingState('checkPw', checkPw, setCheckPw)}
          isRightPwObj={GroupingState('isRightPw', isRightPw, setIsRightPw)}
          nameObj={GroupingState('name', name, setName)}
          emailObj={GroupingState('email', email, setEmail)}
          emailCodeObj={GroupingState('emailCode', emailCode, setEmailCode)}
          phoneObj={GroupingState('phone', phone, setPhone)}
          profileImageObj={GroupingState('profileImage', profileImage, setProfileImage)}
          isCheckedEmailObj={GroupingState('isCheckedEmail', isCheckedEmail, setIsCheckedEmail)}
          pageObj={GroupingState('page', page, setPage)}
          setIsEmailModal={setIsEmailModal}
          modal={modal}
          handleSignUp={handleSignUp}
          handleIdCheck={handleIdCheck}
          handleEmail={handleEmail}
          // handleCertification={handleCertification}
          handleEmailCode={handleEmailCode}
          uploadImage={uploadImage}
        />
      </SignTemplate>
      {
        isEmailModal
          ? 
          <EmailModalContainer 
            emailCodeObj={GroupingState('emailCode', emailCode, setEmailCode)}
            setIsCheckedEmail={setIsCheckedEmail}
            setIsEmailModal={setIsEmailModal}
            email={email}
            handleEmailCode={handleEmailCode}
            modal={modal}
          />
          : <></>
      }
    </>
  );
};

SignContainer.propTypes = {
  store: PropTypes.any,
  history: PropTypes.object
};

export default withRouter(inject('store')(observer(SignContainer)));
