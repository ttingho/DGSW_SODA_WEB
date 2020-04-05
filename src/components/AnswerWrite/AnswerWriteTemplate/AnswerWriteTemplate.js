import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './AnswerWriteTemplate.scss';
import Button from 'components/Common/Button';
import QuestionDetailTemplate from 'components/QuestionDetail/QuestionDetailTemplate/QuestionDetailTemplate.js';
import { MdInsertPhoto, MdClose } from 'react-icons/md';
import classNames from 'classnames';

const cx = classNames.bind(style);

const AnswerWriteTemplate = ({ 
  titleObj,
  contentsObj,
  questionData,
  handleQuesionAnswer
}) => {

  const { answerContents, setAnswerContents } = contentsObj;
  const { answerTitle, setAnswerTitle } = titleObj;

  return (
    <div className={cx('AnswerWriteTemplate')}>
      <QuestionDetailTemplate question={questionData}/>
      <div className={cx('AnswerWriteTemplate-TitleDiv')}>
        <input className={cx('AnswerWriteTemplate-TitleDiv-Title')} type={'text'} placeholder={'제목!'} value={answerTitle} onChange={event => setAnswerTitle(event.target.value)}></input>
      </div>
      <div className={cx('AnswerWriteTemplate-ContentsDiv')}>
        <textarea className={cx('AnswerWriteTemplate-ContentsDiv-Contents')} placeholder={'답변 작성란...'} value={answerContents} onChange={event => setAnswerContents(event.target.value)}></textarea>
      </div>
      <div className={cx('AnswerWriteTemplate-Button')}>
        <Button customStyle={{ width: '150px', height: '100%', margin: 'auto 0 auto auto' }} handleFunction={handleQuesionAnswer}>답변 달기</Button>
      </div>
    </div>
  );
};

export default AnswerWriteTemplate;