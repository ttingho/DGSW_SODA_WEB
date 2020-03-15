import React, { useEffect } from 'react';
import PropTypes  from 'prop-types';
import BambooItem from '../BambooItem';
import style from './BambooTemplate.scss';
import { IoIosArrowDropup } from 'react-icons/io';
import classNames from 'classnames';

const cx = classNames.bind(style);

const BambooTemplate = ({ children }) => {
  const changeScrollPoint = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className="BambooTemplate">
      {children}
      <button className={cx('BambooTemplate-ScrollButton')} onClick={() => changeScrollPoint()}>
        <IoIosArrowDropup className={cx('BambooTemplate-ScrollButton-Image')}/>
      </button>
    </div>
  );
}

BambooTemplate.propTypes = {
  
}

export default BambooTemplate;