import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from './EmailModal.scss';
import { IoIosClose } from 'react-icons/io';
import SignInput from 'components/Common/SignInput';

const cx = classnames.bind(style);

const EmailModal = ({ emailCodeObj, handleCertification, setIsEmailModal }) => {
  const { emailCode, setEmailCode } = emailCodeObj;

  return (
    <>
      <div className={cx('EmailModal-over')}/>
      <div className={cx('EmailModal')}>
        <div className={cx('EmailModal-cancleWrap')}>
          <IoIosClose className={cx('EmailModal-cancleWrap-cancle')} onClick={() => setIsEmailModal(false)}/>
        </div>
        <div className={cx('EmailModal-content')}>
          <div className={cx('EmailModal-content-title')}>
            <span>이메일로부터 받은 코드를 입력해 주세요!</span>
            <span className={cx('EmailModal-content-title-subTitle')}>인증하지 않고 나가면 다시 검증 코드를 받아야 합니다.</span>
          </div>
          <SignInput
            value={emailCode}
            setValue={setEmailCode}
            placeholder={'검증 코드'}
          />
          <button className={cx('EmailModal-content-btn')} onClick={() => handleCertification()}>인증하기</button>
        </div>
        
      </div>
    </>
  );
};

EmailModal.propTypes = {
  emailCodeObj: PropTypes.object,
  handleCertification: PropTypes.func,
  setIsEmailModal: PropTypes.func
};

export default EmailModal;