import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './UpTemplate.scss';
import SignInput from 'components/Common/SignInput';
import ImageIcon from 'components/Common/ImageIcon';
import { typography } from 'styles/typography/typography_scheme';
import { MdCameraAlt } from 'react-icons/md';
import PROFILE_DEFAULT from 'assets/image/panda.jpg';

const { size } = typography;

const cx = classNames.bind(style);

const UpTemplate = ({ signType, pageObj, handleNextPage, setIsEmailModal }) => {
  const { page, setPage } = pageObj;

  const [imgBase64, setImgBase64] = useState(PROFILE_DEFAULT); // 선택한 프로필을 미리보기 위함

  const handleChangeFile = (event) => { // 선택한 프로필을 미리보기 위한 함수
    let reader = new FileReader();
    
    reader.onloadend = () => {
      const base64 = reader.result;
      
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (event.target.files[0]) {
      const { type } = event.target.files[0];
      const isImg = type.split('/');
      const isSvg = isImg[1].indexOf('svg');

      if (isImg[0] !== 'image' || isSvg !== -1) {
        alert('jpg, jpeg, gif, png 형식의 파일만 첨부하실 수 있습니다.');
        event.preventDefault();
      } else {
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  };

  const pageType = () => {
    if (page === 1) {
      return (
        <div className={cx('UpTemplate-page1')}>
          <div className={cx('UpTemplate-page1-idWrap')}>
            <SignInput
              placeholder={'아이디'}
            />
            <div className={cx('UpTemplate-page1-idWrap-idCheck')}>
              <span>아이디를 중복 체크 해주세요!</span>
              <button>아이디 체크</button>
            </div>
          </div>
          <SignInput
            placeholder={'비밀번호'}
            customStyle={{margin: '0 0 20px 0'}}
          />
          <SignInput
            placeholder={'비밀번호 확인'}
            customStyle={{margin: '20px 0'}}
          />
          <button className={cx('UpTemplate-page1-nextBtn')} onClick={() => handleNextPage(2)}>다음</button>
        </div>
      );
    } else if (page === 2) {
      return (
        <div className={cx('UpTemplate-page2')}>
          <SignInput
            customStyle={{margin: '20px 0'}}
            placeholder={'이름'}
          />
          <SignInput
            customStyle={{margin: '20px 0'}}
            placeholder={'전화번호'}
          />
          <div className={cx('UpTemplate-page2-emailWrap')}>
            <SignInput
              customStyle={{margin: '0 0 20px 0'}}
              placeholder={'이메일'}
            />
            <div className={cx('UpTemplate-page2-emailWrap-emailCheck')}>
              <span>이메일을 검증해주세요!</span>
              <button onClick={() => setIsEmailModal(true)}>이메일 검증</button>
            </div>
          </div>
          <div className={cx('UpTemplate-page2-btn')}>
            <button className={cx('UpTemplate-page2-btn-prevBtn')} onClick={() => setPage(1)}>이전</button>
            <button className={cx('UpTemplate-page2-btn-nextBtn')} onClick={() => handleNextPage(3)}>다음</button>
          </div>
        </div>
      );
    } else if (page === 3) {
      return (
        <div className={cx('UpTemplate-page3')}>
          <div className={cx('UpTemplate-page3-profileWrap')}>
            <div className={cx('UpTemplate-page3-profileWrap-header')}>
              <span className={cx('UpTemplate-page3-profileWrap-header-title')}>내 프로필</span>
              <span className={cx('UpTemplate-page3-profileWrap-header-subTitle')}>미설정시 기본 이미지로 됩니다.</span>
            </div>
            <label className={cx('UpTemplate-page3-profileWrap-imageWrap')} htmlFor="imgInput">
              <ImageIcon
                src={imgBase64}
                alt={'img'}
                observer={imgBase64}
              />
              <label
                className={cx('UpTemplate-page3-profileWrap-imageWrap-iconWrap')}
                htmlFor="imgInput"
              >
                <MdCameraAlt className="icon"/>
              </label>
              <input id="imgInput" type="file" onChange={e => handleInputImage(e), e => handleChangeFile(e)} accept="image/*"/>
            </label>
            <button className={cx('UpTemplate-page3-profileWrap-default')}>기본 이미지</button>
          </div>
          <SignInput
            customStyle={{width: '400px', height: '60px', margin: '0 0 20px 0'}}
            placeholder={'닉네임'}
          />
          <div className={cx('UpTemplate-page3-btn')}>
            <button className={cx('UpTemplate-page3-btn-prevBtn')} onClick={() => setPage(2)}>이전</button>
            <button className={cx('UpTemplate-page3-btn-signUp')}>회원가입</button  >
          </div>
        </div>
      );
    }
  };

  return (
    <div className={cx('UpTemplate', {'UpTemplate-hidden': signType})}>
      {pageType()}
    </div>
  );
};

UpTemplate.propTypes = {
  signType: PropTypes.bool,
  pageObj: PropTypes.object,
  handleNextPage: PropTypes.func,
  setIsEmailModal: PropTypes.func,

};

export default UpTemplate;