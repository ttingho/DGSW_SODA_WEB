import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UpTemplate from 'components/Sign/UpTemplate';
import SignUpFormCheck from 'lib/Sign/SignUpFormCheck';

const SignUpContainer = ({
  signType,
  idObj,
  pwObj,
  checkPwObj,
  nameObj,
  emailObj,
  phoneObj,
  nickNameObj,
  profileImageObj,
  pageObj,
  setIsEmailModal,
  modal
}) => {
  const { id } = idObj;
  const { pw } = pwObj;
  const { checkPw } = checkPwObj;
  const { name } = nameObj;
  const { email } = emailObj;
  const { phone } = phoneObj;
  const { nickName } = nickNameObj;
  
  const userObj = {
    id,
    pw,
    checkPw,
    name,
    email,
    phone,
    nickName
  };


  const { page, setPage } = pageObj;

  const handleNextPage = pageType => {
    const { isFormCheck, text, type } = SignUpFormCheck(userObj, page);

    
    setPage(pageType);
  };


  return (
    <>
      <UpTemplate
        signType={signType}
        pageObj={pageObj}
        handleNextPage={handleNextPage}
        setIsEmailModal={setIsEmailModal}
      />
    </>
  );
};

SignUpContainer.propTypes = {
  signType: PropTypes.bool,
  idObj: PropTypes.object,
  pwObj: PropTypes.object,
  checkPwObj: PropTypes.object,
  nameObj: PropTypes.object,
  emailObj: PropTypes.object,
  phoneObj: PropTypes.object,
  nickNameObj: PropTypes.object,
  profileImageObj: PropTypes.object,
  pageObj: PropTypes.object,
  setIsEmailModal: PropTypes.func,
  modal: PropTypes.func
};

export default SignUpContainer;