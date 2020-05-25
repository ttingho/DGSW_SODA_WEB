import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FaFacebookF } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './ExampleCard.scss';
import ImageIcon from 'components/Common/ImageIcon';
import Pagination from 'components/Common/Pagination';

const cx = classNames.bind(style);

const ExampleCard = ({ profileSrc, name, contentsObj, images, imgBase64, handleImageCancel }) => {
  const { contents, setContents } = contentsObj;

  return (
    <div className={cx('ExampleCard')}>
      <div className={cx('ExampleCard-header')}>
        <div className={cx('ExampleCard-header-profile')}>
          <ImageIcon src={profileSrc} alt={'profile'} />
        </div>
        <div className={cx('ExampleCard-header-info')}>
          <span className={cx('ExampleCard-header-info-name')}>{name}</span>
          <span className={cx('ExampleCard-header-info-title')}>대나무숲</span>
        </div>
        <div className={cx('ExampleCard-header-time')}>
          <span className={cx('ExampleCard-header-time-apply')}>제보 : 2020.03.19 03:32</span>
          <span className={cx('ExampleCard-header-time-allowed')}>승인 : 2020.03.19 03:32</span>
        </div>
        <div className={cx('ExampleCard-header-facebook')}>
          <FaFacebookF className={cx('ExampleCard-header-facebook-icon')} />
        </div>
      </div>
      <div className={cx('ExampleCard-images')}>
        <Pagination images={imgBase64} editImages={images} paginationType={'modify'} deleteFunction={handleImageCancel} />
      </div>
      <TextareaAutosize
        value={contents}
        onChange={event => setContents(event.target.value)}
        className={cx('ExampleCard-contents')}
        placeholder={'여기에 당신의 대나무(이야기)를 적어주세요!'}
      />
      <span className={cx('ExampleCard-count', { 'ExampleCard-count-allow': (contents.length !== 0 && contents.length <= 1000) }, { 'ExampleCard-count-deny': contents.length > 1000 })}>{contents.length} / 1000</span>
    </div>
  );
};

ExampleCard.propTypes = {
  profileSrc: PropTypes.string,
  name: PropTypes.string,
  contentsObj: PropTypes.object,
  images: PropTypes.array,
  imgBase64: PropTypes.array,
  handleImageCancel: PropTypes.func
};

export default ExampleCard;
