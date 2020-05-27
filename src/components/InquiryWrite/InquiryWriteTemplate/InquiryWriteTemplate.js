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
  handleImageChange,
  images,
  handleImageCancel,
  imgBase64,
  contentsSet,
  titleSet
}) => {
  const { contents, setContents } = contentsObj;
  const { title, setTitle } = titleObj;
  const { category, setCategory } = categoryObj;
  const [titleLength, setTitleLength] = useState(0);
  const [contentsLength, setContentsLength] = useState(0);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className={cx('QuestionWriteTemplate')}>
      <div className={cx('QuestionWriteTemplate-contentsTopBox')}>
        <select className={cx('QuestionWriteTemplate-contentsTopBox-categoryBox')} value={category} onChange={handleCategory}>
          <option value={'NotSelect'}>카테고리 유형을 선택해 주세요!</option>
          <option value={'서비스 버그 신고'}>서비스 버그 신고</option>
          <option value={'관리자 문의'}>관리자 문의</option>
          <option value={'개발자 QnA'}>개발자 QnA</option>
          <option value={'대소고 QnA'}>대소고 QnA</option>
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
            <input  className={cx('QuestionWriteTemplate-contentsBox-titleBox-titleDiv-title')} type={'text'} placeholder={'문의 제목은 여기 작성 해주세요...'} value={title} onChange={event => { titleSet(event); setTitleLength(event.target.value.length);}}/>
          </div>
          <div className={cx('QuestionWriteTemplate-contentsBox-titleBox-titleLength' , {'QuestionWriteTemplate-contentsBox-colorStyle': titleLength > 0})}>
            {titleLength}/50
          </div>
        </div>
        <div className={cx('QuestionWriteTemplate-contentsBox-imageList')}>
          {
            images && <Pagination images={imgBase64} editImages={images} paginationType={'modify'} deleteFunction={handleImageCancel}/>
          }
        </div>
        <div className={cx('QuestionWriteTemplate-contentsBox-contents')}>
          <textarea className={cx('QuestionWriteTemplate-contentsBox-contents-text')} placeholder={'문의 내용은 여기 작성 해주세요...'} value={contents} onChange={event => { contentsSet(event), setContentsLength(event.target.value.length);}}/>
        </div>
        <div className={cx('QuestionWriteTemplate-contentsBox-contentsLength', {'QuestionWriteTemplate-contentsBox-colorStyle': contentsLength > 0})}>{contentsLength}/1000</div>
      </div>
      <div className={cx('QuestionWriteTemplate-guideDiv')}>
        <span className={cx('QuestionWriteTemplate-guideDiv-title')}>참고:</span>
        <span className={cx('QuestionWriteTemplate-guideDiv-guide')}>사진은 최대 5장 첨부 가능합니다!</span>
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
  imgBase64: PropTypes.array,
  contentsSet: PropTypes.func,
  titleSet: PropTypes.func
};

export default InquiryWriteTemplate;