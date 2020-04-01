import React, { useState } from 'react';
import { TiMessages, TiPencil } from 'react-icons/ti';
import { MdDehaze, MdSearch, MdStarBorder, MdLibraryBooks } from 'react-icons/md';
import { IoMdPaperPlane, IoIosLaptop } from 'react-icons/io';
import { GoShield } from 'react-icons/go';
import { GiSofa, GiSiren } from 'react-icons/gi';
import { FaBasketballBall, FaPen } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { withRouter } from 'react-router-dom';
import SecureLS from 'secure-ls';
import TokenVerification from 'lib/Token/TokenVerification';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './NavBar.scss';
import ImageIcon from '../ImageIcon';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(style);

const NavBar = ({ pageType, url, store, history }) => {
  const isLogin = TokenVerification() !== 'empty' ? true : false;
  
  const { modal } = store.dialog;

  const [isMenu, setIsMenu] = useState(false);

  const handleUrl = (propUrl, propPageType) => {
    if (propPageType === 'soda') {
      modal({
        title: 'Warning!',
        stateType: 'warning',
        contents: '좋은 서비스를 위해 준비 중입니다. (잠시만 기다려주세요!)'
      });

      return;
    }
    
    history.push(propUrl);
  }

  const handleLogout = () => {
    localStorage.removeItem('soda-token');
    localStorage.removeItem('soda-reToken');
    sessionStorage.removeItem('soda-token');
    sessionStorage.removeItem('soda-reToken');
    
    const ls = new SecureLS({ encodingType: 'aes' });

    ls.removeAll();

    history.push('/sign');
  };

  const handleLogin = () => {
    history.push('/sign');
  };

  return (
    <div className={cx('NavBar', { 'NavBar-bamboo-bg': pageType === 'bamboo' }, { 'NavBar-soda-bg': pageType === 'soda' })}>
      <div className={cx('NavBar-menu')}>
        <MdDehaze className={cx('NavBar-menu-icon', { 'NavBar-bamboo-color': isMenu && pageType === 'bamboo' }, { 'NavBar-soda-color': isMenu && pageType === 'soda' })} onClick={() => setIsMenu(!isMenu)} />
        <div className={cx('NavBar-menu-box', { 'NavBar-menu-box-select': isMenu })}>
          <div className={cx('NavBar-menu-box-wrap', { 'NavBar-visible': isMenu })}>
            <div className={cx('NavBar-menu-box-wrap-child')}>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <TiMessages className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/', 'soda')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/', 'soda')}>메인</span>
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <MdStarBorder className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/', 'soda')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/', 'soda')}>이번주 핫한 게시물</span>
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <GiSiren className={cx('NavBar-menu-box-wrap-child-item-icon')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')}>서비스 문의 / 버그 신고</span>
              </div>
            </div>
            <div className={cx('NavBar-menu-box-wrap-child')}>
              <div className={cx('NavBar-menu-box-wrap-child-title')}>
                <span className={cx('NavBar-menu-box-wrap-child-title-contents')}>대나무숲</span>
                <div className={cx('NavBar-menu-box-wrap-child-title-line')} />
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <MdLibraryBooks className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/bamboo', 'bamboo')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/bamboo', 'bamboo')}>대숲피드</span>
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <IoMdPaperPlane className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/bamboo-write', 'bamboo')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/bamboo-write', 'bamboo')}>대나무 제보하기</span>
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <GoShield className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/bamboo-admin', 'bamboo')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/bamboo-admin', 'bamboo')}>관리자</span>
              </div>
            </div>
            <div className={cx('NavBar-menu-box-wrap-child')}>
              <div className={cx('NavBar-menu-box-wrap-child-title')}>
                <span className={cx('NavBar-menu-box-wrap-child-title-contents')}>커뮤니티</span>
                <div className={cx('NavBar-menu-box-wrap-child-title-line')} />
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <IoIosLaptop className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/', 'soda')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/', 'soda')}>개발</span>
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <TiPencil className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/', 'soda')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/', 'soda')}>학업</span>
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <GiSofa className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/', 'soda')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/', 'soda')}>일상</span>
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <FaBasketballBall className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/', 'soda')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/', 'soda')}>취미</span>
              </div>
            </div>
            <div className={cx('NavBar-menu-box-wrap-child')}>
              <div className={cx('NavBar-menu-box-wrap-child-title')}>
                <span className={cx('NavBar-menu-box-wrap-child-title-contents')}>팀빌딩</span>
                <div className={cx('NavBar-menu-box-wrap-child-title-line')} />
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <FaPen className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/team-building', 'soda')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/team-building', 'soda')}>모집 및 신청</span>
              </div>
              <div className={cx('NavBar-menu-box-wrap-child-item')}>
                <FiPhoneCall className={cx('NavBar-menu-box-wrap-child-item-icon')} onClick={() => handleUrl('/team-building-interview', 'soda')} />
                <span className={cx('NavBar-menu-box-wrap-child-item-contents')} onClick={() => handleUrl('/team-building-interview', 'soda')}>온라인 면접</span>
              </div>
            </div>
            <div className={cx('NavBar-menu-box-wrap-logout')}>
              {isLogin ? 
                <span onClick={() => handleLogout()}>로그아웃</span>  
                :
                <span onClick={() => handleLogin()}>로그인</span>
              }
            </div>
            <span className={cx('NavBar-menu-box-wrap-info')}>Made By takeUp Team</span>
          </div>
        </div>
      </div>
      <div className={cx('NavBar-logo', { 'NavBar-bamboo-color': isMenu && pageType === 'bamboo' }, { 'NavBar-soda-color': isMenu && pageType === 'soda' })} onClick={() => {
        history.push(`/${url}`);
        
        window.scrollTo(0, 0);
      }}>
        <TiMessages className={cx('NavBar-logo-icon')} />SODA
      </div>
      <div className={cx('NavBar-search', { 'NavBar-visible': pageType === 'soda' })}>
        <input type={'text'} className={cx('NavBar-search-input')} />
        <MdSearch className={cx('NavBar-search-icon')} />
      </div>
      <div className={cx('NavBar-profile')}>
        <span className={cx('NavBar-profile-name')}>GUEST</span>
        <div className={cx('NavBar-profile-img')}><ImageIcon src={'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'} alt={'profile-image'} /></div>
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
