import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Intro.scss';

const cx = classNames.bind(style);

const Intro = () => {
  return (
    <div className={cx('Intro')}>
      <div className={cx('Intro-page1')}>
        페이지1
      </div>
      <div className={cx('Intro-page2')}>
        페이지2
      </div>
    </div>
  );
};

export default Intro;