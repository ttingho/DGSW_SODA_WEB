import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './IndexItem.scss';

const cx = classNames.bind(style);

const IndexItem = ({ index, itemIndex, handlePage }) => {
  return (
    <div className={cx('IndexItem', { 'IndexItem-select': index === itemIndex })} onClick={() => handlePage(index)}>
      {index}
    </div>
  );
};

IndexItem.propTypes = {
  index: PropTypes.number,
  itemIndex: PropTypes.number,
  handlePage: PropTypes.func
};

export default IndexItem;