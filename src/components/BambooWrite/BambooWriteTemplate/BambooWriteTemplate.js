import React from 'react';
import { FB_APP_ID_TEST } from 'config/config.json';
import { MdInsertPhoto, MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './BambooWriteTemplate.scss';
import ExampleCard from '../ExampleCard';
import Button from 'components/Common/Button/Button';
import Radio from 'components/Common/Radio';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const cx = classNames.bind(style);

const BambooWriteTemplate = ({
  profileSrc,
  name,
  accessToken,
  contentsObj,
  images,
  imgBase64,
  imageContents,
  handleIsUpload,
  handleImageCancel,
  isUpload,
  isType,
  handleIsType,
  handleImageChange,
  handleFaceBookLogin,
  handlePostRequest
}) => {
  const customStyle = {
    width: '145px',
    height: '45px',
    margin: 'auto 0 auto auto'
  };

  const radioContents = <span className={cx('radioContents')}>
    실명 <span className={cx('radioContents-gray')}>(FaceBook 로그인 필요)</span>
  </span>; 

  const { contents, setContents } = contentsObj;

  return (
    <div className={cx('BambooWriteTemplate')}>
      <div className={cx('BambooWriteTemplate-leftPanel')}>
        <textarea className={cx('BambooWriteTemplate-leftPanel-textarea')} placeholder={'여기에 당신의 대나무(이야기)를 적어주세요!'} value={contents} onChange={event => setContents(event.target.value)} />
        <div className={cx('BambooWriteTemplate-leftPanel-image')}>
          <div className={cx('BambooWriteTemplate-leftPanel-image-upload')}>
            <label htmlFor={'image_upload'} className={cx('BambooWriteTemplate-leftPanel-image-upload-label')}>사진 업로드</label>
            <input type={'file'} accept={'image/gif, image/jpeg, image/jpg, image/png'} id={'image_upload'} className={cx('BambooWriteTemplate-leftPanel-image-upload-input')} onChange={handleImageChange} multiple={'multiple'} />
          </div>
          <span className={cx('BambooWriteTemplate-leftPanel-image-detail')}>사진 파일 크기 : 4MB 이하</span>
          <div className={cx('BambooWriteTemplate-leftPanel-image-exampleContents')} onClick={event => handleIsUpload(event)}>
            <MdInsertPhoto className={cx('BambooWriteTemplate-leftPanel-image-exampleContents-icon')} onClick={event => handleIsUpload(event)} />
            <span className={cx('BambooWriteTemplate-leftPanel-image-exampleContents-file')} onClick={event => handleIsUpload(event)}>
              {imageContents}
            </span>
            <div className={cx('BambooWriteTemplate-leftPanel-image-exampleContents-fileList', { 'BambooWriteTemplate-hidden': !isUpload })}>
              {
                images.map((data, index) => {
                  return <div key={index} className={cx('BambooWriteTemplate-leftPanel-image-exampleContents-fileList-item')}>
                    <span className={cx('BambooWriteTemplate-leftPanel-image-exampleContents-fileList-item-name')}>{data.name}</span>
                    <MdClose className={cx('BambooWriteTemplate-leftPanel-image-exampleContents-fileList-item-icon')} onClick={() => handleImageCancel(data.idx)} />
                  </div>;
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className={cx('BambooWriteTemplate-rightPanel')}>
        <div className={cx('BambooWriteTemplate-rightPanel-top')}>
          <Radio
            isRadio={isType}
            radioType={'anonymous'}
            color={'bamboo'} name={'bamboo-wrtie'}
            id={'bamboo_radio_1'}
            contents={'익명'}
            customStyle={{ margin: 'auto 3% auto 0' }}
            onChange={event => {
              handleIsType(event);
              if (accessToken) {
                window.FB.logout();
              }}}
          />
          <FacebookLogin
            appId={FB_APP_ID_TEST}
            autoLoad={false}
            fields='name, email, picture'
            callback={handleFaceBookLogin}
            render={renderProps => (
              <Radio
                isRadio={isType}
                radioType={'realname'}
                color={'bamboo'}
                name={'bamboo-wrtie'}
                id={'bamboo_radio_2'}
                contents={radioContents}
                customStyle={{ margin: 'auto auto auto 0' }}
                onChange={event => {
                  handleIsType(event);
                  renderProps.onClick();
                }}
              />
            )}
          />
          <Button appearance={'secondary'} edgeType={'round'} customStyle={customStyle} handleFunction={handlePostRequest}>대나무 제보하기</Button>
        </div>
        <div className={cx('BambooWriteTemplate-rightPanel-bottom')}>
          <span className={cx('BambooWriteTemplate-rightPanel-bottom-title')}>게시물 미리 보기</span>
          <ExampleCard profileSrc={profileSrc} name={name} contents={contents} images={imgBase64} />
        </div>
      </div>
    </div>
  );
};

BambooWriteTemplate.propTypes = {
  profileSrc: PropTypes.string,
  name: PropTypes.string,
  accessToken: PropTypes.string,
  contentsObj: PropTypes.object,
  images: PropTypes.array,
  imgBase64: PropTypes.array,
  imageContents: PropTypes.string,
  handleIsUpload: PropTypes.func,
  handleImageCancel: PropTypes.func,
  isUpload: PropTypes.bool,
  isType: PropTypes.string,
  handleIsType: PropTypes.func,
  handleImageChange: PropTypes.func,
  handleFaceBookLogin: PropTypes.func,
  handlePostRequest: PropTypes.func
};

export default BambooWriteTemplate;
