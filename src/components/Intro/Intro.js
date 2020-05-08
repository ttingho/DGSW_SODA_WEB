import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import AOS from 'aos';
import { withRouter } from 'react-router-dom';
import { typography } from 'styles/typography/typography_scheme';
import { color } from 'styles/color/color_scheme';
import style from './Intro.scss';
import Footer from 'components/Common/Footer';
import Image1 from 'assets/image/intro/intro_image1.png';
import Image2 from 'assets/image/intro/intro_image2.png';
import Panda from 'assets/image/intro/panda.png';
import Feed from 'assets/image/intro/soda_feed.png';
import Write from 'assets/image/intro/soda_write.png';
import Inquiry from 'assets/image/intro/soda_inquiry.png';
import Inquiry_Write from 'assets/image/intro/soda_inquiry_write.png';
import Member1 from 'assets/image/intro/member_intro1.png';
import Member2 from 'assets/image/intro/member_intro2.png';
import Member3 from 'assets/image/intro/member_intro3.png';
import 'aos/dist/aos.css';

const cx = classNames.bind(style);

const Intro = ({ history }) => {
  
  useEffect(() => {
    AOS.init({
      duration : 1200
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={cx('Intro')}>
      <div className={cx('Intro-page1')}>
        <div className={cx('Intro-page1-wrap')}>
          <div className={cx('Intro-page1-wrap-left')}>
            <div className={cx('Intro-page1-wrap-left-header')}>
              <span onClick={() => history.push('/')}>SODA</span>
            </div>
            <div className={cx('Intro-page1-wrap-left-subtitle')} data-aos='fade-right'>
              <span>대구 소프트웨어 고등학교</span>
              <div className={cx('Intro-page1-wrap-left-subtitle-highlight')}>
                <span style={{color: color.soda_primary}}>소</span>
                <span style={{color: color.black}}>통</span>
                <span style={{color: color.black}}>의</span>&nbsp;
                <span style={{color: color.soda_primary}}>다</span>
                <span style={{color: color.black}}>리</span>
              </div>
            </div>
            <div className={cx('Intro-page1-wrap-left-content')} data-aos='fade-right'>
              현재 대구 소프트웨어 고등학교의 소통을 담당하고 있는 서비스입니다.
              <br/>
              아직 미흡한 점이 많지만, 더 다양한 서비스를 제공하기 위해 계속 발전해 나가겠습니다.
            </div>
          </div>
          <div className={cx('Intro-page1-wrap-right')}>
            <img className={cx('Intro-page1-wrap-right-img')} src={Image1} data-aos='fade-left'/>
          </div>
        </div>
      </div>
      <div className={cx('Intro-page2')}>
        <div className={cx('Intro-page2-wrap')}>
          <div className={cx('Intro-page2-wrap-left')}>
            <img className={cx('Intro-page2-wrap-left-img')} src={Image2} data-aos='fade-right' data-aos-delay='1000'/>
          </div>
          <div className={cx('Intro-page2-wrap-right')} data-aos='fade-left' data-aos-delay='1000'>
            <div className={cx('Intro-page2-wrap-right-subtitle')}>
              <span>맨처음의 시작?</span>
            </div>
            <div className={cx('Intro-page2-wrap-right-content')}>
              대구 소프트웨어 고등학교 졸업생이자 저희의 선배님께서 맨 처음 개발을 하시게 되었습니다.
              <br/>
              1인 개발로 모두가 쉽고 재밌게 이용할 수 있도록 서비스를 운영하시게 되었습니다.
              <br/>
              현재는 3인이 모여서 개발을 진행하고 있으며, 각자 자신의 역할을 열심히 수행하고 있습니다.
            </div>
            <div className={cx('Intro-page2-wrap-right-detail')}>
              <span>자세한 내용 보기</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('Intro-page3')}>
        <div className={cx('Intro-page3-wrap')}>
          <div className={cx('Intro-page3-wrap-left')} data-aos='fade-right'>
            <div className={cx('Intro-page3-wrap-left-subtitle')}>
              <span>대나무 숲?</span>
              <img className={cx('Intro-page3-wrap-left-subtitle-img')} src={Panda}/>
            </div>
            <div className={cx('Intro-page3-wrap-left-content')}>
              저희는 현재 이용하고 있는 이 서비스를 대숲 (대나무 숲)이라고 부릅니다.
              <br/>
              현재 이 서비스는 페이스북 API를 통해 사용자가 간편하게 실명과 익명으로 게시글을 올릴 수 있습니다.
              <br/>
              다같이 소식들을 공유하고 의견을 나누며, 때로는 서로 웃으면서 학교 생활을 보낼 수 있습니다.
            </div>
            <div className={cx('Intro-page3-wrap-left-bamboo')}  onClick={() => history.push('/')}>
              <span>대나무숲</span>&nbsp;보러가기
            </div>
          </div>
          <div className={cx('Intro-page3-wrap-right')} data-aos='fade-left'>
            <img className={cx('Intro-page3-wrap-right-feed')} src={Feed} />
            <img className={cx('Intro-page3-wrap-right-inquiry')} src={Write} />
          </div>
        </div>
      </div>
      <div className={cx('Intro-page4')}>
        <div className={cx('Intro-page4-wrap')}>
          <div className={cx('Intro-page4-wrap-left')} data-aos='fade-right'>
            <img className={cx('Intro-page4-wrap-left-feed')} src={Inquiry} />
            <img className={cx('Intro-page4-wrap-left-inquiry')} src={Inquiry_Write} />
          </div>
          <div className={cx('Intro-page4-wrap-right')} data-aos='fade-left'>
            <div className={cx('Intro-page4-wrap-right-subtitle')}>
              <span>고객센터?</span>
              <span>QnA</span>
            </div>
            <div className={cx('Intro-page4-wrap-right-content')}>
              저희는 원활한 서비스 운영을 하며, SODA 개발자 및 운영자와 소통할 수 있는 공간을 만들었습니다.
              <br/>
              해당 서비스는 SODA 서비스 관련 문의, 개발과 관련된 내용 등을 다양한 카테고리에 맞게 물어볼 수 있습니다.
              <br/>
              SODA 개발자 및 운영자에게 서비스 관련 문의나 궁금한 것을 카테고리에 따라 물어보고 답변을 들어보세요!
            </div>
            <div className={cx('Intro-page4-wrap-right-inquiry')}  onClick={() => history.push('/inquiry')}>
              <span>고객센터</span>&nbsp;보러가기
            </div>
          </div>
        </div>
      </div>
      <div className={cx('Intro-page5')}>
        <div className={cx('Intro-page5-wrap')}>
          <div className={cx('Intro-page5-wrap-top')}>
            <div className={cx('Intro-page5-wrap-top-subtitle')} data-aos='fade-left'>
              <span>DEVELOPER</span>
              <span>개발자 소개</span>
            </div>
          </div>
          <div className={cx('Intro-page5-wrap-bottom')}>
            <div className={cx('Intro-page5-wrap-bottom-member')} data-aos='fade-up'>
              <img className={cx('Intro-page5-wrap-bottom-member-img')} src={Member1} />
              <div className={cx('Intro-page5-wrap-bottom-member-info')}>
                <span>추명호</span>
                <span>웹 프런트 개발</span>
                <span>디자인</span>
              </div>
            </div>
            <div className={cx('Intro-page5-wrap-bottom-member')} data-aos='fade-up' data-aos-delay='200'>
              <img className={cx('Intro-page5-wrap-bottom-member-img')} src={Member2} />
              <div className={cx('Intro-page5-wrap-bottom-member-info')}>
                <span>오해성</span>
                <span>웹 프런트 개발</span>
                <span>서버 개발</span>
              </div>
            </div>
            <div className={cx('Intro-page5-wrap-bottom-member')} data-aos='fade-up' data-aos-delay='400'>
              <img className={cx('Intro-page5-wrap-bottom-member-img')} src={Member3} />
              <div className={cx('Intro-page5-wrap-bottom-member-info')}>
                <span>최석준</span>
                <span>웹 프런트 개발</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

Intro.propTypes = {
  history: PropTypes.object
};

export default withRouter(Intro);