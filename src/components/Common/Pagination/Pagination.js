import React, { useState, useEffect } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Pagination.scss';

const cx = classNames.bind(style);

const Pagination = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);
  
  const handleIndex = prop => {
    if (prop < 0 || prop >= images.length) return;

    setImageIndex(prop);
  };

  return (
    <>
      {
        images.length === 0 ?
          <></> :
          <div className={cx('Pagination')}>
            <div className={cx('Pagination-image')} style={{ backgroundImage: `url(${images[imageIndex]})` }}>
              <FaArrowCircleLeft onClick={() => handleIndex(imageIndex - 1)} className={cx('Pagination-image-icon', { 'Pagination-image-hidden': imageIndex === 0 })} />
              <FaArrowCircleRight onClick={() => handleIndex(imageIndex + 1)} className={cx('Pagination-image-icon', { 'Pagination-image-hidden': imageIndex === (images.length - 1) })} />
            </div>
            <div className={cx('Pagination-bulletWrap')}>
              {
                images.map((data, index) => {
                  return <div onClick={() => handleIndex(index)} key={index} className={cx('Pagination-bulletWrap-bullet', { 'Pagination-bulletWrap-bullet-select': index === imageIndex })} />;
                })
              }
            </div>
          </div>
      }
    </>
  );
};

Pagination.propTypes = {
  images: PropTypes.array
};

export default Pagination;
