import React from 'react';
import classnames from 'classnames/bind';
import style from './BambooLoading.scss';

const cx = classnames.bind(style);

const BambooLoading = () => {
  return (
    <div className={cx('BambooLoading')}>
      <span className={cx('BambooLoading-span')}>S</span>
      <span className={cx('BambooLoading-span')}>O</span>
      <span className={cx('BambooLoading-span')}>D</span>
      <span className={cx('BambooLoading-span')}>A</span>
      <span className={cx('BambooLoading-span')}>.</span>
      <span className={cx('BambooLoading-span')}>.</span>
      <span className={cx('BambooLoading-span')}>.</span>
    </div>
  );
};

export default BambooLoading;
