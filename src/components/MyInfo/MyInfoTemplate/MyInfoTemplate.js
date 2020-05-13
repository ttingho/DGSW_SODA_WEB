import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import style from './MyInfoTemplate.scss';
import { MdCameraAlt } from 'react-icons/md';
import ImageSrc from 'lib/Profile/ImageSrc';
import PROFILE_DEFAULT from 'assets/image/profile/profile.svg';
import ImageIcon from 'components/Common/ImageIcon';

const cx = classNames.bind(style);

const MyInfoTemplate = ({ userInfo, handleLogout, isSetModals, handleImageChange, setBaseProfileImage}) => {
  const { displayName, email, profileImage } = userInfo;
  const { setIsEmailModal, setIsPwModal } = isSetModals;
  
  return (
    <div className={cx('MyInfoTemplate')}>
      <div className={cx('MyInfoTemplate-wrap')}>
        <div className={cx('MyInfoTemplate-wrap-line1')}>
          <div className={cx('MyInfoTemplate-wrap-line1-left')}>
            <label className={cx('MyInfoTemplate-wrap-line1-left-imageWrap')} htmlFor="imgInput">
              <ImageIcon
                src={ImageSrc(profileImage, PROFILE_DEFAULT)}
                alt={'img'}
                customClass={'MyInfoTemplate-wrap-line1-left-imageWrap-img'}
                onErrorFunc={event => event.target.src = PROFILE_DEFAULT}
                observer={profileImage}
              />
              <label
                className={cx('MyInfoTemplate-wrap-line1-left-imageWrap-iconWrap')}
                htmlFor="imgInput"
              >
                <MdCameraAlt className="icon"/>
              </label>
              <input id="imgInput" type="file" onChange={handleImageChange} accept="image/*" multiple={'multiple'}/>
            </label>            
            <button className={cx('MyInfoTemplate-wrap-line1-left-profileBtn')} onClick={() => setBaseProfileImage()}>
              기본 이미지로 설정
            </button>
          </div>
          <span className={cx('MyInfoTemplate-wrap-line1-logoutBtn')} onClick={() => handleLogout()}>로그아웃</span>
        </div>        
        <div className={cx('MyInfoTemplate-wrap-line2')}>
          <div className={cx('MyInfoTemplate-wrap-line2-name')}>
            이름<span>{displayName}</span>
          </div>
        </div>
        <div className={cx('MyInfoTemplate-wrap-line3')}>
          <div className={cx('MyInfoTemplate-wrap-line3-email')}>
            이메일<span>{email}</span>
          </div>
          <button className={cx('MyInfoTemplate-wrap-line3-btn')} onClick={() => setIsEmailModal(true)}>
            이메일 변경
          </button>
        </div>
        <div className={cx('MyInfoTemplate-wrap-line4')}>
          <button className={cx('MyInfoTemplate-wrap-line4-btn')} onClick={() => setIsPwModal(true)}>
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

MyInfoTemplate.propTypes = {
  userInfo: PropTypes.object,
  handleLogout: PropTypes.func,
  isSetModals: PropTypes.object,
  handleImageChange: PropTypes.func,
  setBaseProfileImage: PropTypes.func
};

export default MyInfoTemplate;