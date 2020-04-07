import React from 'react';
import PropTypes from 'prop-types';
import EmailModal from 'components/Sign/EmailModal';

const EmailModalContainer = ({ emailCodeObj, setIsCheckedEmail, setIsEmailModal, email, handleEmailCode, modal }) => {
  const { emailCode } = emailCodeObj;  

  const handleCertification = async() => {
    let data = {
      code: emailCode,
      email: email
    };

    await handleEmailCode(data)
      .then((response) => {
        if (response.status === 200) {
          setIsCheckedEmail(true);
          setIsEmailModal(false);
          modal({
            title: 'Success!',
            stateType: 'success',
            contents: '이메일 검증에 성공했습니다.',
          });
        }
      }).catch((error) => {
        const { status } = error.response.data;

        if (status === 400) {
          modal({
            title: 'Warning!',
            stateType: 'warning',
            contents: '코드를 입력해주세요.'
          });
          return;
        } 
        if (status === 403) {
          modal({
            title: 'Warning!',
            stateType: 'warning',
            contents: '올바른 검증 코드를 입력해주세요.'
          });
          return;
        }
      });
  };

  return (
    <>
      <EmailModal 
        emailCodeObj={emailCodeObj}
        setIsEmailModal={setIsEmailModal}
        handleCertification={handleCertification}
      />
    </>
  );
};

EmailModalContainer.propTypes = {
  emailCodeObj: PropTypes.object,
  setIsCheckedEmail: PropTypes.func,
  setIsEmailModal: PropTypes.func,
  email: PropTypes.string,
  handleEmailCode: PropTypes.func,
  modal: PropTypes.func
};

export default EmailModalContainer;