import React from 'react';
import PropTypes from 'prop-types';
import EmailModal from 'components/Sign/EmailModal';

const EmailModalContainer = ({ emailCodeObj, setIsEmailModal, modal }) => {
      
  let textParts = text.split(':'); // 암호화된 코드로 부터 iv길이 할당 text == 암호
  let iva = Buffer.from(textParts.shift(), 'hex');// 암호화된 코드로 부터 iv길이 할당 ASCII CODE
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');// 암호화 된 코드 가져오기 ASCII CODE
  let decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(emailSecretCode), iva); // 복호화
  let decrypted = decipher.update(encryptedText); // 복호화 

  decrypted = Buffer.concat([decrypted, decipher.final()]); // Buffer 형식 바꾸기

  const code = decrypted.toString(); // 복호화 된 암호 코드

  return (
    <>
      <EmailModal 
        emailCodeObj={emailCodeObj}
        setIsEmailModal={setIsEmailModal}
      />
    </>
  );
};

EmailModalContainer.propTypes = {
  emailCodeObj: PropTypes.object,
  setIsEmailModal: PropTypes.func,
  modal: PropTypes.func
};

export default EmailModalContainer;