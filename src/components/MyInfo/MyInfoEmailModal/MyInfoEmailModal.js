import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './MyInfoEmailModal.scss';
import { MdClose } from 'react-icons/md';
import Button from 'components/Common/Button';

const cx = classNames.bind(style);

const MyInfoEmailModal = ({ setIsEmailModal, emailObj, handleModifyEmail }) => {
  const { email, setEmail } = emailObj;

  return (
    <>
      <div className={cx('MyInfoEmailModalTemplate-over')} onClick={() => setIsEmailModal(false)}/>
      <div className={cx('MyInfoEmailModalTemplate')}>
        <div className={cx('MyInfoEmailModalTemplate-closeButtonDiv')}>
          <MdClose className={cx('MyInfoEmailModalTemplate-closeButtonDiv-closeButton')}  onClick={() => setIsEmailModal(false)}/>
        </div>
        <div className={cx('MyInfoEmailModalTemplate-contentsDiv')}>
          <div className={cx('MyInfoEmailModalTemplate-contentsDiv-title')}>
            <span>이메일 변경</span>
          </div>
          <div className={cx('MyInfoEmailModalTemplate-contentsDiv-emailDiv')}>
            <input className={cx('MyInfoEmailModalTemplate-contentsDiv-emailDiv-emailBox') } placeholder={'이메일'} type={'text'} value={email} onChange={event => setEmail(event.target.value)}/>
          </div>
          <Button customStyle={{ width: '150px', height: '50px'}} handleFunction={handleModifyEmail}>변경 하기</Button>
        </div>
      </div>
    </>
  );
};

MyInfoEmailModal.propTypes = {
  setIsEmailModal: PropTypes.func,
  emailObj: PropTypes.object,
  handleModifyEmail: PropTypes.func,
};

export default MyInfoEmailModal;