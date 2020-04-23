import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import MyInfoTemplate from 'components/MyInfo/MyInfoTemplate';

const MyInfoContainer = ({ history }) => {
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

  return (
    <>
      <MyInfoTemplate userInfo={userInfo} handleLogout={handleLogout}/>
    </>
  );
};

MyInfoContainer.propTypes = {
  history: PropTypes.object
};

export default withRouter(MyInfoContainer);