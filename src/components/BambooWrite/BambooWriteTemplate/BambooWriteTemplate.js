import React from 'react';
import { MdInsertPhoto } from 'react-icons/md';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './BambooWriteTemplate.scss';
import ExampleCard from '../ExampleCard';
import Button from 'components/Common/Button/Button';
import Radio from 'components/Common/Radio';
import { color } from 'styles/color/color_scheme';
import { typography } from 'styles/typography/typography_scheme';

const cx = classNames.bind(style);

const BambooWriteTemplate = ({
  profileSrc,
  name,
  contentsObj,
  imagesObj,
  handleIsType,
  handleImageChange
}) => {
  const customStyle = {
    width: '145px',
    height: '45px',
    margin: 'auto 0 auto auto'
  };

  const radioContents = <span className={cx('radioContents')}>실명 <span className={cx('radioContents-gray')}>(FaceBook 로그인 필요)</span></span>;
  
  const { contents, setContents } = contentsObj;
  const { images, setImages } = imagesObj;

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
          <div className={cx('BambooWriteTemplate-leftPanel-image-exampleContents')}>
            <MdInsertPhoto className={cx('BambooWriteTemplate-leftPanel-image-exampleContents-icon')} />
            <span className={cx('BambooWriteTemplate-leftPanel-image-exampleContents-file')}>image.jpeg</span>
          </div>
        </div>
      </div>
      <div className={cx('BambooWriteTemplate-rightPanel')}>
        <div className={cx('BambooWriteTemplate-rightPanel-top')}>
          <Radio color={'bamboo'} name={'bamboo-wrtie'} id={'bamboo_radio_1'} contents={'익명'} customStyle={{ margin: 'auto 3% auto 0' }} onClick={() => handleIsType('anonymous')} />
          <Radio color={'bamboo'} name={'bamboo-wrtie'} id={'bamboo_radio_2'} contents={radioContents} customStyle={{ margin: 'auto auto auto 0' }} onClick={() => handleIsType('realname')} />
          <Button appearance={'secondary'} edgeType={'round'} customStyle={customStyle}>대나무 제보하기</Button>
        </div>
        <div className={cx('BambooWriteTemplate-rightPanel-bottom')}>
          <span className={cx('BambooWriteTemplate-rightPanel-bottom-title')}>게시물 미리 보기</span>
          <ExampleCard profileSrc={profileSrc} name={name} contents={contents} images={images} />
        </div>
      </div>
    </div>
  );
};

BambooWriteTemplate.propTypes = {
  profileSrc: PropTypes.string,
  name: PropTypes.string,
  contentsObj: PropTypes.object,
  imagesObj: PropTypes.object,
  handleIsType: PropTypes.func,
  handleImageChange: PropTypes.func
};

export default BambooWriteTemplate;
