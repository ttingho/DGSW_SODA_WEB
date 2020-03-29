import React from 'react';
import classNames from 'classnames/bind';
import style from './PageLoading.scss';

const cx = classNames.bind(style);

const PageLoading = () => {
  return (
    <div className={cx('PageLoading')}>
      <span className={cx('PageLoading-span')}>S</span>
      <span className={cx('PageLoading-span')}>O</span>
      <span className={cx('PageLoading-span')}>D</span>
      <span className={cx('PageLoading-span')}>A</span>
      <span className={cx('PageLoading-span')}>.</span>
      <span className={cx('PageLoading-span')}>.</span>
      <span className={cx('PageLoading-span')}>.</span>
    </div>
  );
};

export default PageLoading;
