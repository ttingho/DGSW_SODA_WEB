import React, { useEffect, useCallback, useState } from 'react';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import BambooAdminTemplate from 'components/BambooAdmin/BambooAdminTemplate';
import TokenVerification from 'lib/Token/TokenVerification';
import { withRouter } from 'react-router-dom';
import usePending from 'lib/HookState/usePending';
import RefreshToken from 'lib/Token/RefreshToken';
import BambooAdminCard from 'components/BambooAdmin/BambooAdminCard';
import useStores from 'lib/HookState/useStore';

const BambooAdmin = observer(({ history }) => {
  const { store } = useStores();

  const { modal } = store.dialog;

  const { pendingList, selectIndex, getPendingList, requestBambooPost } = store.admin;

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const token = TokenVerification();

  const [pendingItemList, setPendingItemList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const requestInitialData = async () => {
    await getPendingList()
      .catch(error => {
        const { status } = error.response;

        if (status === 410) {
          RefreshToken(modal, status, () => getPendingList());
        }
      });
  };

  const handleRequestBambooPost = (isAllow, idx, index) => {
    setIsLoading(true);

    const data = {
      idx,
      isAllow
    };

    requestBambooPost(data, index)
      .then(response => {
        setIsLoading(false);

        const { status } = response;

        if (status === 200 && isAllow === 0) {
          modal({
            title: 'Success!',
            stateType: 'success',
            contents: '대나무(이야기) 거절에 성공했습니다.'
          });
        }

        if (status === 200 && isAllow === 1) {
          modal({
            title: 'Success!',
            stateType: 'success',
            contents: '대나무(이야기) 승인에 성공했습니다.'
          });
        }
      })
      .catch(error => {
        setIsLoading(false);

        const { status } = error.response;

        if (status === 410) {
          RefreshToken(modal, status, () => requestBambooPost(isAllow, idx));
        }

        if (status === 403) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '권한 없음.'
          });
        }

        if (status === 500) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '대나무가 상했어요..ㅠㅠ 기다려주세요!'
          });
        }
      });
  };

  const [isPending, getFunction] = usePending(requestInitialData);

  useEffect(() => {
    if (pendingList) {
      setPendingItemList(pendingList.map((data, index) => {
        return <BambooAdminCard key={index} index={index} selectIndex={selectIndex} item={data} isLoading={isLoading} handleRequestBambooPost={handleRequestBambooPost} />;
      }));
    }
  }, [pendingList, isLoading, selectIndex]);

  useEffect(() => {
    if (token === 'empty' || (userInfo === null || userInfo.auth !== 0)) {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '올바르지 못한 세션 접근 (관리자 계정으로 다시 시도해주세요!)'
      });
      
      history.goBack(1);

      return;
    }

    getFunction();
  }, []);

  return (
    <BambooAdminTemplate isPending={isPending}>
      {
        pendingItemList
      }
    </BambooAdminTemplate>
  );
});

BambooAdmin.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(BambooAdmin);
