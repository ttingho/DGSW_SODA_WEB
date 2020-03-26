import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from './EmailModal.scss';
import { IoIosClose } from 'react-icons/io';
import SignInput from 'components/Common/SignInput';

const cx = classnames.bind(style);

const EmailModal = ({ setIsEmailModal }) => {
  return (
    <>
      <div className={cx('EmailModal-over')} onClick={() => setIsEmailModal(false)}/>
      <div className={cx('EmailModal')}>
        <div className={cx('EmailModal-cancleWrap')}>
          <IoIosClose className={cx('EmailModal-cancleWrap-cancle')} onClick={() => setIsEmailModal(false)}/>
        </div>
        <div className={cx('EmailModal-content')}>
          <div className={cx('EmailModal-content-title')}>
            이메일로부터 받은 코드를 입력해 주세요!
          </div>
          <SignInput
            placeholder={'검증 코드'}
          />
          <button className={cx('EmailModal-content-btn')}>인증하기</button>
        </div>
        
      </div>
    </>
  );
};

EmailModal.propTypes = {
  setIsEmailModal: PropTypes.func
};

export default EmailModal;