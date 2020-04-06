import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import style from './QuestionDetailTemplate.scss';
import { MdInsertPhoto, MdClose } from 'react-icons/md';
import dateFormat from 'dateformat';
import classNames from 'classnames';
import Pagination from 'components/Common/Pagination';
import QIconImage from '../../../assets/image/q-character-alphabet-letter-32868.png';
import AIconImage from '../../../assets/image/AIcon.png';

const cx = classNames.bind(style);

const QuestionDetailTemplate = ({ question, answer }) => {
  const { title, contents, memberId, joinDate, category, isComplate, picture } = question;

  const joinDateFormat = dateFormat(joinDate, 'yyyy-mm-dd h:MM:ss');
  
  const [complateContents, setComplateContents] = useState('');
  const [images, setImages] = useState([]);
  const [isImages, setIsimages] = useState(false);
  const [answerData, setAnswerData] = useState([]);

  const setpitureDataComplateData = useCallback(async () => {
    if (picture && picture.length !== 0) {
      console.log('picture');
      
      const list  = [];

      for (let i = 0; i < picture.length; i++) {
        list.push(picture[i].url);
      }

      setImages(list);
      setIsimages(true);
    }

    if (isComplate === 1) {
      setComplateContents('답변 완료!');
    } else {
      setComplateContents('답변 기다리는 중...');
    }

    if (answer) {
      const { title, contents, memberId, joinDate } = answer;
      const joinDateFormat = dateFormat(joinDate, 'yyyy-mm-dd h:MM:ss');

      setAnswerData(
        <div>
          <div className={cx('QuestionDetailTemplate-AnswerTop')}>
            <img className={cx('QuestionDetailTemplate-AnswerTop-Icon')} src={AIconImage}/>
          </div>
          <div className={cx('QuestionDetailTemplate-AnswerContentsCardDiv')}>
            <div className={cx('QuestionDetailTemplate-AnswerContentsCardDiv-TitleBox')}>
              <span className={cx('QuestionDetailTemplate-AnswerContentsCardDiv-TitleBox-Title')}>
                {title}
              </span>
            </div>
            <div className={cx('QuestionDetailTemplate-AnswerContentsCardDiv-ContentsBox')}>
              <span>
                {contents}
              </span>
            </div>
            <div className={cx('QuestionDetailTemplate-AnswerContentsCardDiv-ProfileBox')}>
              <span className={cx('QuestionDetailTemplate-AnswerContentsCardDiv-ProfileBox-MemberId')}>
                {'작성자: ' + memberId}
              </span>
              <span className={cx('QuestionDetailTemplate-AnswerContentsCardDiv-ProfileBox-Date')}>
                {'작성날짜: ' + joinDateFormat}
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      setAnswerData(
        <div>

        </div>
      );
    }
  }, []);
  

  useEffect(() => {
    setpitureDataComplateData();
  }, []);

  return (
    <div className={cx('QuestionDetailTemplate')}>
      <div className={cx('QuestionDetailTemplate-QuestionCatgory')}>
        <div className={cx('QuestionDetailTemplate-QuestionCatgory-Title')}>
          {'카테고리'}
        </div>
        <div className={cx('QuestionDetailTemplate-QuestionCatgory-Contents')}>
          {category}
        </div>
      </div>
      <div className={cx('QuestionDetailTemplate-Top')}>
        <img className={cx('QuestionDetailTemplate-Top-Icon')} src={QIconImage}/>
      </div>
      <div className={cx('QuestionDetailTemplate-QuestionCardDiv')}>
        <div className={cx('QuestionDetailTemplate-QuestionCardDiv-TitleBox')}>
          <span className={cx('QuestionDetailTemplate-QuestionCardDiv-TitleBox-Title')}>
            {title}
          </span>
        </div>
        <div className={cx('QuestionDetailTemplate-QuestionCardDiv-ContentsBox')}>
          <div className={cx('QuestionDetailTemplate-QuestionCardDiv-ContentsBox-Image')}>
            { 
              isImages && <Pagination images={images}/>
            }
          </div>
          <span className={cx('QuestionDetailTemplate-QuestionCardDiv-ContentsBox-Contents')}>
            {contents}
          </span>
        </div>
        <div className={cx('QuestionDetailTemplate-QuestionCardDiv-ProfileBox')}>
          <span className={cx('QuestionDetailTemplate-QuestionCardDiv-ProfileBox-MemberId')}>
            {'작성자: ' + memberId }
          </span>
          <span className={cx('QuestionDetailTemplate-QuestionCardDiv-ProfileBox-Date')}>
            {'작성날짜: ' + joinDateFormat}
          </span>
          <div className={cx('QuestionDetailTemplate-QuestionCardDiv-ProfileBox-IsComplate')}>
            {
              complateContents
            }
          </div>
        </div>
      </div>
      {answerData}
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
    category: '관리자 문의',
  },
  answer: {
    idx: 5,
    title: 'asdfadsf',
    contents: 'adsf?',
    memberId: 'test',
    isComplate: 0,
    joinDate: '2020-03-28T05:52:56.000Z',
    category: '관리자 문의',
  },
};

QuestionDetailTemplate.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.object
};

export default QuestionDetailTemplate;