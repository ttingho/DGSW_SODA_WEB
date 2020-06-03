import React, { useState, useEffect } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { MdClose, MdArrowBack, MdArrowForward } from 'react-icons/md';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Pagination.scss';

const cx = classNames.bind(style);

const Pagination = ({ images, editImages, paginationType, deleteFunction }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleIndex = prop => {
    if (prop < 0 || prop >= images.length) return;

    setImageIndex(prop);
  };

  const handleCancelImage = async () => {
    const idx = editImages[imageIndex].idx;

    await deleteFunction(idx);

    if (editImages.length === 0 || imageIndex === 0) {
      setImageIndex(0);

      return;
    }

    setImageIndex(idx - 1);
  };

  return (
    <>
      {
        images.length === 0 ?
          <></> :
          <div className={cx('Pagination', { 'Pagination-single': images.length === 1 }, { 'Pagination-multiple': images.length > 1 })}>
            <div className={cx('Pagination-image')} style={{ backgroundImage: `url(${images[imageIndex]})` }}>
              <div className={cx('Pagination-image-iconWrap', { 'Pagination-image-hidden': imageIndex === 0 })} onClick={() => handleIndex(imageIndex - 1)}>
                <MdArrowBack className={cx('Pagination-image-iconWrap-icon')} />
              </div>
              <div className={cx('Pagination-image-iconWrap', { 'Pagination-image-hidden': imageIndex === (images.length - 1) })} onClick={() => handleIndex(imageIndex + 1)}>
                <MdArrowForward className={cx('Pagination-image-iconWrap-icon')} />
              </div>
              <div className={cx('Pagination-image-delBtn', { 'Pagination-image-hidden': paginationType !== 'modify' })} onClick={handleCancelImage}>
                <MdClose className={cx('Pagination-image-delBtn-icon')} />
              </div>
            </div>
            {
              images.length === 1 ?
                <></> :
                <div className={cx('Pagination-bulletWrap')}>
                  {
                    images.map((data, index) => {
                      return <div onClick={() => handleIndex(index)} key={index} className={cx('Pagination-bulletWrap-bullet', { 'Pagination-bulletWrap-bullet-select': index === imageIndex })} />;
                    })
                  }
                </div>
            }
          </div>
      }
    </>
  );
};

Pagination.propTypes = {
  images: PropTypes.array,
  editImages: PropTypes.array,
  paginationType: PropTypes.oneOf([
    'basic',
    'modify'
  ]),
  deleteFunction: PropTypes.func
};

Pagination.defaultProps = {
  paginationType: 'basic',
  deleteFunction: () => {}
};

export default Pagination;
