import React, { useEffect } from 'react';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import BambooAdminTemplate from 'components/BambooAdmin/BambooAdminTemplate';
import TokenVerification from 'lib/Token/TokenVerification';
import { withRouter } from 'react-router-dom';

const BambooAdmin = ({ store, history }) => {
  const { modal } = store.dialog;

  const { pendingList, getPendingList } = store.admin;

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const token = TokenVerification();

  useEffect(() => {
    console.log(pendingList);
  }, [pendingList]);

  useEffect(() => {
    if (token === 'empty' && (userInfo === null || userInfo.auth !== 0)) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '올바른 세션 접근이 아닙니다.'
      });
      
      history.goBack(1);

      return;
    }

    getPendingList();
  }, []);

  return (
    <BambooAdminTemplate>
      
    </BambooAdminTemplate>
  );
};

BambooAdmin.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default inject('store')(observer(withRouter(BambooAdmin)));
