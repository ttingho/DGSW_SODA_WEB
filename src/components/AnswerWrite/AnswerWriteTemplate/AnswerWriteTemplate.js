import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './AnswerWriteTemplate.scss';
import Button from 'components/Common/Button';
import { MdInsertPhoto, MdClose } from 'react-icons/md';
import classNames from 'classnames';

const cx = classNames.bind(style);

const AnswerWriteTemplate = ({ 
  titleObj,
  contentsObj,
  idx,
  questionData
}) => {
console.log(questionData);

  const { answerContents, setAnswerContents } = contentsObj;
  const { answerTitle, setAnswerTitle } = titleObj;
  const { title, contents, memberId, picture, joinDate, category } = questionData;

  return (
    <div className={cx('AnswerWriteTemplate')}>
      <div>

      </div>
      <div>

      </div>
      <div>

      </div>
    </div>
  );
};

export default AnswerWriteTemplate;