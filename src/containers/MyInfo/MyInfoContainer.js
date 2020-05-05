import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import MyInfoTemplate from 'components/MyInfo/MyInfoTemplate';
import MyInfoEmailModalContainer from './MyInfoEmailModalContainer.js';
import MyInfoPwModalContainer from './MyInfoPwModalContainer';

const MyInfoContainer = ({ history }) => {
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [isPwModal, setIsPwModal] = useState(false);

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const handleLogout = () => {
    localStorage.removeItem('soda-token');
    localStorage.removeItem('soda-reToken');
    sessionStorage.removeItem('soda-token');
    sessionStorage.removeItem('soda-reToken');
    
    const ls = new SecureLS({ encodingType: 'aes' });

    ls.removeAll();

    history.push('/sign');
  };

  const isSetModals = {
    setIsEmailModal,
    setIsPwModal,
  };

  return (
    <>
      <MyInfoTemplate 
        userInfo={userInfo}
        handleLogout={handleLogout}
        isSetModals={isSetModals}
      />
      {
        isEmailModal
          ? <MyInfoEmailModalContainer setIsEmailModal={setIsEmailModal}/>
          : isPwModal
            ? <MyInfoPwModalContainer setIsPwModal={setIsPwModal}/>
            : <></>
      }
    </>
  );
};

MyInfoContainer.propTypes = {
  history: PropTypes.object
};

export default withRouter(MyInfoContainer);