import React from 'react';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import style from './BambooEmpathy.scss';

const cx = classnames.bind(style);

const BambooEmpathy = ({ EmpathyIcon, empathyType, empathyCount, isEmpathy, handleFunc }) => {
  return (
    <>
      <span className='BambooEmpathy'>
        <EmpathyIcon className={cx('BambooEmpathy-icon', `BambooEmpathy-icon-${empathyType}`, { 'BambooEmpathy-icon-none': empathyType !== isEmpathy })} onClick={handleFunc} />
        <span className='BambooEmpathy-count'>{empathyCount}</span>
      </span>
    </>
  );
};

BambooEmpathy.propTypes = {
  EmpathyIcon: PropTypes.any,
  empathyType: PropTypes.oneOf([
    'like',
    'love',
    'funny',
    'cool',
    'sad',
    'angry'
  ]),
  empathyCount: PropTypes.number,
  isEmpathy: PropTypes.oneOf([
    'like',
    'love',
    'funny',
    'cool',
    'sad',
    'angry',
    'none'
  ]),
  handleFunc: PropTypes.func
};

export default BambooEmpathy;
