import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import style from './QuestionDetailTemplate.scss';
import { MdInsertPhoto, MdClose } from 'react-icons/md';
import dateFormat from 'dateformat';
import classNames from 'classnames';
import Pagination from 'components/Common/Pagination';

const cx = classNames.bind(style);

const QuestionDetailTemplate = ({ question, answer }) => {
  console.log(question, answer);

  const { title, contents, memberId, joinDate, category, isComplate, picture } = question;
 
  const joinDateFormat = dateFormat(joinDate, 'yyyy-mm-dd h:MM:ss');

  const [complateContents, setComplateContents] = useState('');
  const [images, setImages] = useState([]);

  const setpitureDataComplateData = useCallback(async () => {
    if (picture && picture.length !== 0) {
      const list  = [];

      for (let i = 0; i < picture.length; i++) {
        list.push(picture[i].url);
      }

      setImages(list);
    }

    if (isComplate === 1) {
      setComplateContents('답변 완료!');
    } else {
      setComplateContents('답변 기다리는 중...');
    }
  }, []);

  useEffect(() => {
    setpitureDataComplateData();
  }, []);

  return (
    <div className={cx('QuestionDetailTemplate')}>
      <div className={cx('QuestionDetailTemplate-QuestionCatgory')}>
        <span className={cx('QuestionDetailTemplate-QuestionCatgory-Contents')}>
          {category}
        </span>
        <div className={cx('QuestionDetailTemplate-QuestionCatgory-IsComplate')}>
          {
            complateContents
          }
        </div>
      </div>
      <div className={cx('QuestionDetailTemplate-QuestionCardDiv')}>
        <div className={cx('QuestionDetailTemplate-QuestionCardDiv-TitleBox')}>
          <span className={cx('QuestionDetailTemplate-QuestionCardDiv-TitleBox-Title')}>
            {title}
          </span>
        </div>
        <div className={cx('QuestionDetailTemplate-QuestionCardDiv-ProfileBox')}>
          <span className={cx('QuestionDetailTemplate-QuestionCardDiv-ProfileBox-MemberId')}>
            {'작성자: ' + memberId}
          </span>
          <span className={cx('QuestionDetailTemplate-QuestionCardDiv-ProfileBox-Date')}>
            {'작성날짜: ' + joinDateFormat}
          </span>
        </div>
        <div className={cx('QuestionDetailTemplate-QuestionCardDiv-ContentsBox')}>
          <span>
            {contents}
          </span>
          <Pagination images={images} />
        </div>
      </div>
    </div>
  );
};

QuestionDetailTemplate.defaultProps = {
  question: {
    idx: 5,
    title: 'asdfadsf',
    contents: 'adsf?',
    memberId: 'test',
    isComplate: 0,
    joinDate: '2020-03-28T05:52:56.000Z',
    category: 'string',
    picture: [
      {
        idx: 1,
        questionIdx: 1,
        type: 'jpg',
        uploadName: '129482949.jpg',
        url: 'https://takeup.co.kr:8000/image/jpg/129482949.jpg.jpg'
      }
    ]
  },
  answer: {
    idx: 1,
    title: 'test',
    contents: 'test',
    memberId: 'test',
    questionIdx: 5,
    joinDate: '2020-02-01T15:00:00.000Z',
    category: 'string'
  }
};

QuestionDetailTemplate.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.object
};

export default QuestionDetailTemplate;