import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './BambooAdminCard.scss';
import ImageIcon from 'components/Common/ImageIcon';
import Pagination from 'components/Common/Pagination';
import Button from 'components/Common/Button';
import DEFAULT_PROFILE from 'assets/image/panda.jpg';

const cx = classNames.bind(style);

const BambooAdminCard = ({ index, selectIndex, item, isLoading, handleRequestBambooPost }) => {
  const customStyle = {
    width: '15%',
    height: '60%'
  };

  const [images, setImages] = useState([]);

  const handleImages = () => {
    if (item.picture && item.picture.length !== 0) {
      const list  = [];

      for (let i = 0; i < item.picture.length; i++) {
        list.push(item.picture[i].url);
      }

      setImages(list);
    }
  };

  useEffect(() => {
    handleImages();
  }, [item]);

  return (
    <div className={cx('BambooAdminCard')}>
      <div className={cx('BambooAdminCard-header')}>
        <div className={cx('BambooAdminCard-header-profile')}>
          <ImageIcon src={item.profileImage !== null ? item.profileImage : DEFAULT_PROFILE} alt={'profile'} />
        </div>
        <div className={cx('BambooAdminCard-header-info')}>
          <span className={cx('BambooAdminCard-header-info-name')}>{item.name}</span>
          <span className={cx('BambooAdminCard-header-info-title')}>대나무숲</span>
        </div>
        <div className={cx('BambooAdminCard-header-time')}>
          <span className={cx('BambooAdminCard-header-time-apply')}>제보 : {moment.parseZone(item.joinDate).format('YYYY.MM.DD HH:mm')}</span>
        </div>
      </div>
      <div className={cx('BambooAdminCard-contents-images')}>
        {
          item.picture === null ?
            <></> :
            <Pagination images={images} />
        }
      </div>
      <div className={cx('BambooAdminCard-contents')}>
        <p className={cx('BambooAdminCard-contents-text')}>
          {item.contents}
        </p>
      </div>
      <div className={cx('BambooAdminCard-footer')}>
        <Button isLoading={isLoading} loadingType={selectIndex === index ? 'basic' : 'none'} appearance={'secondary'} customStyle={customStyle} handleFunction={() => handleRequestBambooPost(1, item.idx, index)}>승인</Button>
        <Button isLoading={isLoading} loadingType={selectIndex === index ? 'basic' : 'none'} appearance={'red'} customStyle={customStyle} handleFunction={() => handleRequestBambooPost(0, item.idx, index)}>취소</Button>
      </div>
    </div>
  );
};

BambooAdminCard.propTypes = {
  index: PropTypes.number,
  selectIndex: PropTypes.number,
  item: PropTypes.object,
  isLoading: PropTypes.bool,
  handleRequestBambooPost: PropTypes.func
};

export default BambooAdminCard;
