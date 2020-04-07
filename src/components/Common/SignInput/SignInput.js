import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './SignInput.scss';
import { MdDone, MdClose } from 'react-icons/md';

const cx = classNames.bind(style);

const SignInput = ({
  customStyle,
  customClass,
  signType,
  isCorrect,
  value,
  setValue,
  inputType,
  placeholder,
  handleEnterFunc,
  handleFocusOut,
  isReadOnly
}) => {
  const handleEnter = event => {
    if (event.keyCode === 13) handleEnterFunc();
  };

  return (
    <div className={cx('SignInput')}>
      <input
        className={cx('SignInput-input', customClass, {'SignInput-input-readOnly': isReadOnly})}
        style={{ width: customStyle.width, height: customStyle.height, margin: customStyle.margin }}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => handleEnter(e)}
        onBlur={e => handleFocusOut(e)}
        readOnly={isReadOnly}
      />
      {
        signType === 'up'
          ? isCorrect === true
            ? <MdDone/>
            : <MdClose/>
          : <></>
      }
    </div>
  );
};

SignInput.propTypes = {
  customStyle: PropTypes.object,
  customClass: PropTypes.string,
  signType: PropTypes.string,
  isCorrect: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  handleEnterFunc: PropTypes.func,
  handleFocusOut: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

SignInput.defaultProps = {
  customStyle: {
    width: '500px',
    height: '60px',
    margin: '0'
  },
  customClass: '',
  signType: 'in',
  isCorrect: false,
  value: '',
  setValue: () => {},
  inputType: 'text',
  placeholder: '',
  handleEnterFunc: () => {},
  handleFocusOut: () => {},
  isReadOnly: false,
};

export default SignInput;