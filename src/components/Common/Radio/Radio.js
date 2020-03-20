import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Radio.scss';

const cx = classNames.bind(style);

const Radio = ({ color, name, id, contents, customStyle, onClick }) => {
  return (
    <label htmlFor={id} className={cx('Radio')} style={customStyle} onClick={() => onClick()}>
      {contents}
      <input type={'radio'} name={name} id={id} className={cx('Radio-input', { 'Radio-input-soda': color === 'soda' }, { 'Radio-input-bamboo': color === 'bamboo' }, { 'Radio-input-community': color === 'community' })} />
      <div className={cx('Radio-checked', { 'Radio-checked-soda': color === 'soda' }, { 'Radio-checked-bamboo': color === 'bamboo' }, { 'Radio-checked-community': color === 'community' })} />
    </label>
  );
};

Radio.propTypes = {
  color: PropTypes.oneOf([
    'soda',
    'bamboo',
    'community'
  ]),
  name: PropTypes.string,
  id: PropTypes.string,
  contents: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ]),
  customStyle: PropTypes.string,
  onClick: PropTypes.func
};

Radio.defaultProps = {
  onClick: () => {}
};

export default Radio;
