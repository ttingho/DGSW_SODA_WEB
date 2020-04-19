import React from 'react';
import style from './NotFoundTemplate.scss';
import classNames from 'classnames';
import boat from 'assets/image/Astronaut-big.png';

const cx = classNames.bind(style);

const NotFoundTemplate = () => {

  return (
    <div className={cx('NotFound')}>
      <div className={cx('NotFound-NotFoundNumber')}>
        Error: 404
      </div>
      <div className={cx('NotFound-NotFoundText')}>
        The page was not found
      </div>
      <div className={cx('NotFound-HomePageLinkDiv')}>
        <a className={cx('NotFound-HomePageLinkDiv-HomePageLink')} href={'https://takeup.co.kr'}> Home Page</a>
      </div>
      <div className={cx('NotFound-NotFoundImageBackground')}>
        <img className={cx('NotFound-NotFoundImageBackground-NotFoundImageStyle')} src={boat}/>
      </div>
    </div>
  );
};

export default NotFoundTemplate;