import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Radio.scss';

const cx = classNames.bind(style);

const Radio = ({ isRadio, radioType, color, name, id, contents, customStyle, onChange }) => {

  return (
    <label htmlFor={id} className={cx('Radio')} style={customStyle}>
      {contents}
      <input type={'radio'} value={radioType} name={name} id={id} onChange={event => onChange(event)} checked={(isRadio !== 'empty') && (isRadio !== undefined) ? isRadio === radioType ? true : false : false} className={cx('Radio-input', { 'Radio-input-soda': color === 'soda' }, { 'Radio-input-bamboo': color === 'bamboo' }, { 'Radio-input-community': color === 'community' })} />
      <div className={cx('Radio-checked', { 'Radio-checked-soda': color === 'soda' }, { 'Radio-checked-bamboo': color === 'bamboo' }, { 'Radio-checked-community': color === 'community' })} />
    </label>
  );
};

Radio.propTypes = {
  isRadio: PropTypes.string,
  radioType: PropTypes.string,
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
  customStyle: PropTypes.object,
  onChange: PropTypes.func
};

Radio.defaultProps = {
  onChange: () => {}
};

export default Radio;
