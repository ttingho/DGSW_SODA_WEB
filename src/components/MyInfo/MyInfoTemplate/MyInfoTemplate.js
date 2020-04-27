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

const MyInfoTemplate = ({ userInfo, handleLogout }) => {
  const { displayName, nickName, email, profileImage } = userInfo;
  console.log(userInfo);

  return (
    <div className={cx('MyInfoTemplate')}>
      <div className={cx('MyInfoTemplate-wrap')}>
        <div className={cx('MyInfoTemplate-wrap-line1')}>
          <label className={cx('MyInfoTemplate-wrap-line1-imageWrap')} htmlFor="imgInput">
            <ImageIcon
              src={ImageSrc(profileImage, PROFILE_DEFAULT)}
              alt={'img'}
              customClass={'MyInfoTemplate-wrap-line1-imageWrap-img'}
              onErrorFunc={event => event.target.src = PROFILE_DEFAULT}
              observer={profileImage}
            />
            <label
              className={cx('MyInfoTemplate-wrap-line1-imageWrap-iconWrap')}
              htmlFor="imgInput"
            >
              <MdCameraAlt className="icon"/>
            </label>
            <input id="imgInput" type="file" onChange={e => {}} accept="image/*"/>
          </label>
          <span className={cx('MyInfoTemplate-wrap-line1-logout')} onClick={() => handleLogout()}>로그아웃</span>
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
          <button className={cx('MyInfoTemplate-wrap-line3-btn')}>
            이메일 변경
          </button>
        </div>
        <div className={cx('MyInfoTemplate-wrap-line4')}>
          <button className={cx('MyInfoTemplate-wrap-line4-btn')}>
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

MyInfoTemplate.propTypes = {
  userInfo: PropTypes.object,
  handleLogout: PropTypes.func
};

export default MyInfoTemplate;