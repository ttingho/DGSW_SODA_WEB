import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import TokenVerification from 'lib/Token/TokenVerification';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './NavBar.scss';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(style);

const NavBar = ({ pageType, url, store, history }) => {  
  const { modal } = store.dialog;

  const [adminAuth, setAdminAuth] = useState(false);

  const ls = new SecureLS({ encodingType: 'aes' });

  const userInfo = ls.get('user-info');

  const token = TokenVerification();

  const setUserInfo = () => {
    if (token === 'empty' && !userInfo) {
      setAdminAuth(false);
    } else if (userInfo && userInfo.auth === 0) {
      setAdminAuth(true);
    }
  };

  const handleUrl = (propUrl) => {
    if (propUrl === '/bamboo-admin' || propUrl === '/inquiry-admin') {
      if (adminAuth === false || token === 'empty') {
        modal({
          title: 'Warning!',
          stateType: 'warning',
          contents: '접근 권한 없음! (관리자 계정으로 다시 시도 해주세요!)'
        });
  
        return;
      }
    } else if (propUrl === '/inquiry-write') {
      if (token === 'empty') {
        modal({
          title: 'Warning!',
          stateType: 'warning',
          contents: '문의 작성은 로그인 후 이용 가능 합니다!'
        });
  
        return;
      }
    }
    
    history.push(propUrl);
  };
  
  const perPage = () => {
    if (pageType === 'bamboo') {
      return (
        <div className={cx('NavBar-bottom-wrap-content')}>
          <div className={cx('NavBar-bottom-wrap-content-btns')}>
            <button className={cx('NavBar-bottom-wrap-content-btns-button', {'NavBar-clicked': url === 'bamboo'})} onClick={() => handleUrl('/bamboo')}>대숲 게시글</button>
            <button className={cx('NavBar-bottom-wrap-content-btns-button', {'NavBar-clicked': url === 'bamboo-write'})} onClick={() => handleUrl('/bamboo-write')}>작성하기</button>
            <button className={cx('NavBar-bottom-wrap-content-btns-button', {'NavBar-clicked': url === 'bamboo-admin'})} onClick={() => handleUrl('/bamboo-admin')}>어드민</button>
            <button className={cx('NavBar-bottom-wrap-content-btns-button', {'NavBar-clicked': url === 'bamboo-inquiry'})} onClick={() => handleUrl('/inquiry')}>고객센터</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={cx('NavBar-bottom-wrap-content')}>
          <div className={cx('NavBar-bottom-wrap-content-btns')}>
            <button className={cx('NavBar-bottom-wrap-content-btns-button', {'NavBar-clicked': url === 'inquiry'})} onClick={() => handleUrl('/inquiry')}>문의</button>
            <button className={cx('NavBar-bottom-wrap-content-btns-button', {'NavBar-clicked': url === 'inquiry-write'})} onClick={() => handleUrl('/inquiry-write')}>문의하기</button>
            <button className={cx('NavBar-bottom-wrap-content-btns-button', {'NavBar-clicked': url === 'inquiry-admin'})} onClick={() => handleUrl('/inquiry-admin')}>어드민</button>
            <button className={cx('NavBar-bottom-wrap-content-btns-button', {'NavBar-clicked': url === 'bamboo'})} onClick={() => handleUrl('/bamboo')}>대나무 숲</button>
          </div>
        </div>
      );
    }
  };

  const handleLogout = () => {    // 임시
    localStorage.removeItem('soda-token');
    localStorage.removeItem('soda-reToken');
    sessionStorage.removeItem('soda-token');
    sessionStorage.removeItem('soda-reToken');
    
    const ls = new SecureLS({ encodingType: 'aes' });

    ls.removeAll();

    history.push('/sign');
  };

  useEffect(() => {
    setUserInfo();
  });

  return (
    <>
      <div className={cx('NavBar', {'NavBar-inquiry': pageType === 'inquiry'})}>
        <div className={cx('NavBar-top')}>
          <div className={cx('NavBar-top-wrap')}>
            <div className={cx('NavBar-top-wrap-header', {'NavBar-top-wrap-header-inquiry': pageType === 'inquiry'})}>
              <div className={cx('NavBar-top-wrap-header-title')}>
                <span onClick={() => history.push('/')}>SODA</span> 
                {pageType === 'bamboo'
                  ? <span className={cx('NavBar-top-wrap-header-title-bamboo')}>대나무 숲</span>
                  : <span className={cx('NavBar-top-wrap-header-title-inquiry')}>고객센터</span>
                }
              </div>
            </div>
            <div className={cx('NavBar-top-wrap-content')}>
              <div className={cx('NavBar-top-wrap-content-btns')}>
                <button className={cx('NavBar-top-wrap-content-btns-login')}
                  onClick={() => handleLogout()}
                >
                  {token !== 'empty' ?
                    '로그아웃' : <></>
                  }
                </button>
                <button className={cx('NavBar-top-wrap-content-btns-login', {'NavBar-top-wrap-content-btns-login-inquiry': pageType === 'inquiry'})}
                  onClick={() => {
                    if (token === 'empty') history.push('/sign');
                  }}
                >
                  {token === 'empty' ?
                    '로그인'
                    : <>{userInfo.displayName} <span>님</span></>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('NavBar-bottom')}>
          <div className={cx('NavBar-bottom-wrap')}>
            {perPage()}
          </div>
        </div>
      </div>
    </>
  );
};

NavBar.propTypes = {
  pageType: PropTypes.oneOf([
    'bamboo',
    'inquiry'
  ]),
  url: PropTypes.string,
  store: PropTypes.object,
  history: PropTypes.object
};

export default inject('store')(observer(withRouter(NavBar)));