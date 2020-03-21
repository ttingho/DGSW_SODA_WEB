import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './ExampleCard.scss';
import ImageIcon from 'components/Common/ImageIcon';

const cx = classNames.bind(style);

const ExampleCard = ({ profileSrc, name, contents, images }) => {
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
      <div className={cx('ExampleCard-contents-images')}>
        
      </div>
      <div className={cx('ExampleCard-contents')}>
        <p className={cx('ExampleCard-contents-text')}>
          {
            contents.length === 0 ?
              '옆에 대나무(이야기)를 적으면 미리 볼 수 있어요!' :
              contents
          }
        </p>
      </div>
    </div>
  );
};

ExampleCard.propTypes = {
  profileSrc: PropTypes.string,
  name: PropTypes.string,
  contents: PropTypes.string,
  images: PropTypes.array
};

export default ExampleCard;
