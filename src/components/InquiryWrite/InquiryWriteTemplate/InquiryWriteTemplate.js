import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './InquiryWriteTemplate.scss';
import Button from 'components/Common/Button';
import { MdInsertPhoto, MdClose } from 'react-icons/md';
import classNames from 'classnames';
import Pagination from 'components/Common/Pagination';

const cx = classNames.bind(style);

const InquiryWriteTemplate = ({ 
  titleObj,
  contentsObj,
  categoryObj,
  handleQuestionWrite,
  imageContents,
  handleImageChange,
  images,
  handleImageCancel,
  imgBase64,
  goBackFunction,
}) => {
  console.log(imgBase64);
  
  const { contents, setContents } = contentsObj;
  const { title, setTitle } = titleObj;
  const { category, setCategory } = categoryObj;

  const [isImage, setIsImage] = useState(false);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className={cx('QuestionWriteTemplate')}>
      <div className={cx('QuestionWriteTemplate-contentsTopBox')}>
        <select className={cx('QuestionWriteTemplate-contentsTopBox-categoryBox')} value={category} onChange={handleCategory}>
          <option value={'NotSelect'}>카테고리 유형을 선택해 주세요!</option>
          <option value={'대숲 버그 신고'}>대숲 서비스 관련 버그 신고</option>
          <option value={'소다 버그 신고'}>소다 서비스 관련 버그 신고</option>
          <option value={'관리자 문의'}>관리자한테 궁금 한거</option>
          <option value={'기타 문의'}>기타</option>
        </select>
        <div className={cx('QuestionWriteTemplate-contentsTopBox-uploadButtonDiv')}>
          <label className={cx('QuestionWriteTemplate-contentsTopBox-uploadButtonDiv-label')} htmlFor={'image_upload'}>사진 업로드</label>
          <input id={'image_upload'} className={'QuestionWriteTemplate-contentsTopBox-uploadButtonDiv-uploadButton'} type={'file'} accept={'image/gif, image/jpeg, image/jpg, image/png'} onChange={handleImageChange} multiple={'multiple'}></input>
        </div>
        <Button customStyle={{ width: '150px', height: '50px', margin: 'auto 0 auto auto' }} handleFunction={handleQuestionWrite}>문의 하기</Button>
      </div>
      <div className={cx('QuestionWriteTemplate-contentsBox')}>
        <div className={cx('QuestionWriteTemplate-contentsBox-titleBox')}>
          <div className={cx('QuestionWriteTemplate-contentsBox-titleBox-qIconDiv')}>
            <span className={cx('QuestionWriteTemplate-contentsBox-titleBox-qIconDiv-qIcon')}>Q</span>
          </div>
          <div className={cx('QuestionWriteTemplate-contentsBox-titleBox-titleDiv')}>
            <input value={title} onChange={event => setTitle(event.target.value)} className={cx('QuestionWriteTemplate-contentsBox-titleBox-titleDiv-title')} type={'text'} placeholder={'문의 제목은 여기 작성 해주세요...'}/>
          </div>
        </div>
        <div className={cx('QuestionWriteTemplate-contentsBox-imageList')}>
          {
            images && <Pagination images={imgBase64}/>
          }
        </div>
        <div className={cx('QuestionWriteTemplate-contentsBox-contents')}>
          <textarea className={cx('QuestionWriteTemplate-contentsBox-contents-text')} placeholder={'문의 내용은 여기 작성 해주세요...'} value={contents} onChange={event => setContents(event.target.value)}/>
        </div>
      </div>
    </div>
  );
};

InquiryWriteTemplate.propTypes = {
  titleObj: PropTypes.object,
  contentsObj: PropTypes.object,
  categoryObj: PropTypes.object,
  handleQuestionWrite: PropTypes.func,
  imageContents: PropTypes.string,
  handleImageChange: PropTypes.func,
  images: PropTypes.array,
  handleImageCancel: PropTypes.func,
  category: PropTypes.string,
  handleCategory: PropTypes.func,
  goBackFunction: PropTypes.func,
  imgBase64: PropTypes.array
};

export default InquiryWriteTemplate;