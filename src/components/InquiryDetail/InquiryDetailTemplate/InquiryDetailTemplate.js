import React from 'react';
import { MdMoreVert } from 'react-icons/md';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './InquiryDetailTemplate.scss';
import Pagination from 'components/Common/Pagination';
import moment from 'moment';
import Button from 'components/Common/Button';
import { typography } from 'styles/typography/typography_scheme.js';
import { TextareaAutosize } from '@material-ui/core';

const cx = classNames.bind(style);

const btnStyle = {
  width: '10%',
  height: '60%',
  margin: 'auto 0 auto auto',
  fontSize: typography.size.s2
};

const InquiryDetailTemplate = ({
  question,
  answer,
  userType,
  memberId,
  inquiryTitleObj,
  inquiryContentsObj,
  answerTitleObj,
  answerContentsObj,
  isInquiryMore,
  isInquiryType,
  isAnswerMore,
  isAnswerType,
  images,
  handleAnswer,
  handlePutInquiry,
  handlePutAnswer,
  handleDeleteInquiry,
  handleDeleteAnswer,
  handleIsMore,
  handleIsType,
  isComplate
}) => {
  // Inquiry State
  const { inquiryTitle, setInquiryTitle } = inquiryTitleObj;
  const { inquiryContents, setInquiryContents } = inquiryContentsObj;

  // Answer State
  const { answerTitle, setAnswerTitle } = answerTitleObj;
  const { answerContents, setAnswerContents } = answerContentsObj;

  return (
    <div className={cx('InquiryDetailTemplate')}>
      <div className={cx('InquiryDetailTemplate-QuestionCatgory')}>
        <div className={cx('InquiryDetailTemplate-QuestionCatgory-Title')}>
          {'카테고리'}
        </div>
        <div className={cx('InquiryDetailTemplate-QuestionCatgory-Contents')}>
          {question.category}
        </div>
      </div>
      <div className={cx('InquiryDetailTemplate-QuestionCardDiv')}>
        <div className={cx('InquiryDetailTemplate-QuestionCardDiv-TitleBox')}>
          <span className={cx('InquiryDetailTemplate-QuestionCardDiv-TitleBox-icon')}>Q.</span>
          {
            isInquiryType === 'MODIFY' ?
              <input value={inquiryTitle} onChange={event => setInquiryTitle(event.target.value)} type={'text'} placeholder={'제목'} className={cx('InquiryDetailTemplate-input')} /> :
              <span className={cx('InquiryDetailTemplate-QuestionCardDiv-TitleBox-Title')}>
                {question.title}
              </span>
          }
          {
            isInquiryType === 'MODIFY' ?
              <Button handleFunction={handlePutInquiry} loadingType={'text'} customStyle={btnStyle}>수정하기</Button> :
              <></>
          }
          {
            (isComplate === 0 && userType === 1 && memberId === question.memberId) || ((isComplate === 1 || isComplate === 0) && userType === 0) ?
              <MdMoreVert className={cx('InquiryDetailTemplate-menuIcon')} onClick={() => handleIsMore('inquiry')} /> :
              <></>
          }
          <div className={cx('InquiryDetailTemplate-QuestionCardDiv-menuBox', { 'InquiryDetailTemplate-hidden': !isInquiryMore })}>
            {
              isComplate === 0 && userType === 1 && memberId === question.memberId ?
                <>
                  <span
                    className={cx('InquiryDetailTemplate-QuestionCardDiv-menuBox-child1')}
                    onClick={() => {
                      if (isInquiryType === 'READ_ONLY') handleIsType('inquiry', 'MODIFY');

                      if (isInquiryType === 'MODIFY') handleIsType('inquiry', 'READ_ONLY');
                    }}
                  >
                    {
                      isInquiryType === 'READ_ONLY' ?
                        '수정하기' :
                        'Read Only'
                    }
                  </span>
                  <div className={cx('InquiryDetailTemplate-QuestionCardDiv-menuBox-line')} />
                  <span className={cx('InquiryDetailTemplate-QuestionCardDiv-menuBox-child2')} onClick={handleDeleteInquiry}>삭제하기</span>
                </> :
                (isComplate === 1 || isComplate === 0) && userType === 0 ?
                  <span className={cx('InquiryDetailTemplate-QuestionCardDiv-menuBox-child2')} onClick={handleDeleteInquiry}>삭제하기</span> :
                  <></>
            }
          </div>
        </div>
        <div className={cx('InquiryDetailTemplate-QuestionCardDiv-ContentsBox')}>
          <div className={cx('InquiryDetailTemplate-QuestionCardDiv-ContentsBox-Image', { 'InquiryDetailTemplate-hidden': images.length === 0 })}>
            { 
              images && <Pagination images={images}/>
            }
          </div>
          {
            isInquiryType === 'MODIFY' ?
              <TextareaAutosize
                value={inquiryContents}
                onChange={event => setInquiryContents(event.target.value)}
                placeholder={'답변 내용'}
                className={cx('InquiryDetailTemplate-textarea')}
              /> :
              <pre className={cx('InquiryDetailTemplate-QuestionCardDiv-ContentsBox-Contents')}>
                {question.contents}
              </pre>
          }
        </div>
        <div className={cx('InquiryDetailTemplate-QuestionCardDiv-ProfileBox')}>
          <span className={cx('InquiryDetailTemplate-QuestionCardDiv-ProfileBox-MemberId')}>
            {'작성자 : ' + question.memberId}
          </span>
          <span className={cx('InquiryDetailTemplate-QuestionCardDiv-ProfileBox-Date')}>
            {'작성날짜 : ' + moment.parseZone(question.joinDate).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
      </div>
      <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv')}>
        {
          userType === 0 ?
            <>
              <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox')}>
                <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox-icon')}>A.</span>
                {
                  isAnswerType === 'MODIFY' || !isComplate ?
                    <input value={answerTitle} onChange={event => setAnswerTitle(event.target.value)} type={'text'} placeholder={'제목'} className={cx('InquiryDetailTemplate-input')} /> :
                    <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox-Title')}>{answer.title}</span>
                }
                {
                  !isComplate ?
                    <Button loadingType={'text'} handleFunction={handleAnswer} customStyle={btnStyle}>작성하기</Button> :
                    isAnswerType === 'MODIFY' && isComplate ?
                      <Button handleFunction={handlePutAnswer} loadingType={'text'} customStyle={btnStyle}>수정하기</Button> :
                      <></>
                }
                {
                  isComplate ?
                    <MdMoreVert className={cx('InquiryDetailTemplate-menuIcon')} onClick={() => handleIsMore('answer')} /> :
                    <></>
                }
                <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-menuBox', { 'InquiryDetailTemplate-hidden': !isAnswerMore })}>
                  {
                    isComplate ?
                      <>
                        <span
                          className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-menuBox-child1')}
                          onClick={() => {
                            if (isAnswerType === 'READ_ONLY') handleIsType('answer', 'MODIFY');

                            if (isAnswerType === 'MODIFY') handleIsType('answer', 'READ_ONLY');
                          }}
                        >
                          {
                            isAnswerType === 'READ_ONLY' ?
                              '수정하기' :
                              'Read Only'
                          }
                        </span>
                        <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-menuBox-line')} />
                        <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-menuBox-child2')} onClick={handleDeleteAnswer}>삭제하기</span>
                      </> :
                      <></>
                  }
                </div>
              </div>
              <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ContentsBox')}>
                {
                  isAnswerType === 'MODIFY' || isComplate === 0 ?
                    <TextareaAutosize
                      value={answerContents}
                      onChange={event => setAnswerContents(event.target.value)}
                      placeholder={'답변 내용'}
                      className={cx('InquiryDetailTemplate-textarea')}
                    /> :
                    <pre className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ContentsBox-Contents')}>{answer.contents}</pre>
                }
              </div>
              <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox')}>
                <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox-MemberId')}>
                  {
                    isComplate === 1 && answer !== null ?
                      '작성자 : ' + answer.memberId :
                      '작성자 : ' + memberId
                  }
                </span>
                <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox-Date')}>
                  {
                    isComplate === 1 && answer !== null ?
                      '작성날짜 : ' + moment.parseZone(answer.joinDate).format('YYYY-MM-DD HH:mm:ss') :
                      '작성날짜 : ' + moment().format('YYYY-MM-DD HH:mm:ss')
                  }
                </span>
              </div>
            </> :
            <>
              <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox')}>
                <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox-icon')}>A.</span>
                <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox-Title')}>
                  {
                    answer !== null ?
                      answer.title :
                      '답변 대기 중'
                  }
                </span>
              </div>
              <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ContentsBox')}>
                <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ContentsBox-Contents')}>
                  {
                    answer !== null ?
                      answer.contents :
                      '관리자로부터 작성된 답변이 없습니다. (조금만 기다려주세요!)'
                  }
                </span>
              </div>
              <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox')}>
                <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox-MemberId')}>
                  {
                    answer !== null ?
                      '작성자 : ' + answer.memberId :
                      '작성자 : 미정'
                  }
                </span>
                <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox-Date')}>
                  {
                    answer !== null ?
                      '작성날짜 : ' + moment.parseZone(answer.joinDate).format('YYYY-MM-DD HH:mm:ss') :
                      '작성날짜 : 진행 중'
                  }
                </span>
              </div>
            </>
        }
      </div>
    </div>
  );
};

InquiryDetailTemplate.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.object,
  userType: PropTypes.number,
  memberId: PropTypes.string,
  inquiryTitleObj: PropTypes.object,
  inquiryContentsObj: PropTypes.object,
  answerTitleObj: PropTypes.object,
  answerContentsObj: PropTypes.object,
  isInquiryMore: PropTypes.bool,
  isInquiryType: PropTypes.oneOf([
    'READ_ONLY',
    'MODIFY'
  ]),
  isAnswerMore: PropTypes.bool,
  isAnswerType: PropTypes.oneOf([
    'READ_ONLY',
    'MODIFY'
  ]),
  images: PropTypes.array,
  handleAnswer: PropTypes.func,
  handlePutInquiry: PropTypes.func,
  handlePutAnswer: PropTypes.func,
  handleDeleteInquiry: PropTypes.func,
  handleDeleteAnswer: PropTypes.func,
  handleIsMore: PropTypes.func,
  handleIsType: PropTypes.func,
  isComplate: PropTypes.number
};

InquiryDetailTemplate.defaultProps = {
  question: {
    idx: 0,
    title: '',
    contents: '',
    memberId: '',
    isComplate: 0,
    joinDate: '',
    category: '',
  },
  answer: {
    idx: 0,
    title: '',
    contents: '',
    memberId: '',
    isComplate: 0,
    joinDate: '',
    category: '',
  }
};

export default InquiryDetailTemplate;
