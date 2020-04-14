import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import TokenVerification from 'lib/Token/TokenVerification';
import styled, { css }from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './NavBar.scss';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(style);

const NavBar = ({ pageType, url, store, history }) => {  
  const { modal } = store.dialog;

  const [bambooFeedStyle, setBambooFeedStyle] = useState('');
  const [bambooWriteStyle, setBambooWriteStyle] = useState('');
  const [bambooAdminStyle, setBambooAdminStyle] = useState('');
  const [adminAuth, setAdminAuth] = useState(false);

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const token = TokenVerification();

  const setUserInfo = () => {
    if (!token && !userInfo) {
      setAdminAuth(false);
    } else if (userInfo && userInfo.auth === 0) {
      setAdminAuth(true);
    }
  };

  const setButtonStyle = () => {
    switch (url) {
    case 'bamboo':
      setBambooFeedStyle('NavBar-ButtonContents');
      break;
    case 'bamboo-write':
      setBambooWriteStyle('NavBar-ButtonContents');
      break;
    case 'bamboo-admin':
      setBambooAdminStyle('NavBar-ButtonContents');
      break;
    default:
      break;
    }
  };


  const handleUrl = (propUrl, propPageType) => {
    // if (propPageType === 'soda') {
    //   modal({
    //     title: 'Warning!',
    //     stateType: 'warning',
    //     contents: '좋은 서비스를 위해 준비 중입니다. (잠시만 기다려주세요!)'
    //   });

    //   return;
    // }

    if (propUrl === '/bamboo-admin') {
      console.log(propUrl);
      
      if (!adminAuth) {
        modal({
          title: 'Warning!',
          stateType: 'warning',
          contents: '접근 권한 없음! (관리자 계정으로 다시 시도 해주세요!)'
        });
  
        return;
      }
    }
    
    history.push(propUrl);
  };

  useEffect(() => {
    setUserInfo();
    setButtonStyle();
  });

  return (
    <div className={cx('NavBar')}>
      <div className={cx('NavBar-MainButtonBox')}>
        <button className={cx('NavBar-MainButtonBox-MainButton')} onClick={() => handleUrl('/bamboo', 'bamboo')}>SODA</button>
      </div>
      <div className={cx('NavBar-ButtonsBox')}>
        <div className={cx('NavBar-ButtonsBox-BambooFeedButtonBox')}>
          <button className={cx('NavBar-ButtonsBox-BambooFeedButtonBox-BambooFeedButton', bambooFeedStyle)} onClick={() => handleUrl('/bamboo', 'bamboo')}>대숲 게시글</button>
        </div>
        <div className={cx('NavBar-ButtonsBox-BambooWriteButtonBox')}>
          <button className={cx('NavBar-ButtonsBox-BambooWriteButtonBox-BambooWriteButton', bambooWriteStyle)} onClick={() => handleUrl('/bamboo-write', 'bamboo')}>대숲 제보하기</button>
        </div>
        <div className={cx('NavBar-ButtonsBox-QuestionWriteButtonBox')}>
          <button className={cx('NavBar-ButtonsBox-QuestionWriteButtonBox-QuestionWriteButton')} onClick={() => handleUrl('/inquiry', 'soda')}>건의하기</button>
        </div>
        <div className={cx('NavBar-ButtonsBox-AdminButtonBox')}>
          <button className={cx('NavBar-ButtonsBox-AdminButtonBox-AdminButton', bambooAdminStyle)} onClick={() => handleUrl('/bamboo-admin', 'bamboo')}>관리자</button>
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  pageType: PropTypes.oneOf([
    'bamboo',
    'soda'
  ]),
  url: PropTypes.string,
  store: PropTypes.object,
  history: PropTypes.object
};

export default inject('store')(observer(withRouter(NavBar)));
