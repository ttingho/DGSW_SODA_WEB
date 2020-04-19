import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import AOS from 'aos';
import { SectionsContainer, Section, Header, Footer } from 'react-fullpage';
import { withRouter } from 'react-router-dom';
import { TiMessages } from 'react-icons/ti';
import { FaPen, FaFacebookSquare, FaQuestion } from 'react-icons/fa';
import { MdPeople, MdPersonOutline, MdChat, MdPublic, MdThumbsUpDown } from 'react-icons/md';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { TiSocialYoutubeCircular } from 'react-icons/ti';
import { IoMdShare } from 'react-icons/io';
import { typography } from 'styles/typography/typography_scheme.js';
import style from './Intro.scss';
import Button from 'components/Common/Button';
import Bamboo1 from 'assets/image/bamboo1.png';
import Bamboo2 from 'assets/image/bamboo2.png';
import 'aos/dist/aos.css';


const { size } = typography;
const cx = classNames.bind(style);

const Intro = ({ history }) => {
  
  useEffect(() => {
    AOS.init({
      duration : 1200
    });
    window.scrollTo(0, 0);
  }, []);

  // const options = {
  //   activeClass : 'active' , //  섹션 링크에 추가 된 클래스
  //   anchors : ['first', 'second', 'third'] , //  각 섹션의 앵커               
  //   arrowNavigation : true , //  화살표 키 사용       
  //   // className : ' SectionContainer ' , //  섹션 컨테이너의 클래스 이름             
  //   delay : 600 , //  스크롤 애니메이션 속도                 
  //   navigation : true , //  내비게이션 사용            
  //   scrollBar : false , //  브라우저 기본 스크롤바 사용             
  //   sectionClassName : ' Section ' , //  섹션 클래스 이름      
  //   sectionPaddingTop : ' 0 ' , //  섹션 상단 패딩     
  //   sectionPaddingBottom : ' 0 ' , //  섹션 하단 패딩  
  //   verticalAlign : false //  각 섹션의 내용을 세로로 정렬 
  // };

  return (
    // <SectionsContainer {...options}>
    //   <Section className={'Intro-page1'}>
    //     <div className={cx('Intro-page1')}>
    //       <div className={cx('Intro-page1-left')} data-aos={'fade-right'}>
    //         <div className={cx('Intro-page1-left-title')}>
    //           대구소프트웨어고등학교<span>대나무 숲</span>
    //         </div>
    //         <div className={cx('Intro-page1-left-content1')}>
    //           <div className={cx('Intro-page1-left-content1-line1')}>
    //             <span>Facebook</span>을 통한 대소고인들과의 소통
    //           </div>
    //           <div className={cx('Intro-page1-left-content1-line2')}>
    //             <span>Facebook API</span>로 대나무 숲 전용 페이지에 게시물을 올릴 수 있어요!
    //           </div>
    //           <div className={cx('Intro-page1-left-content1-line3')}>
    //             <FaFacebookSquare className={cx('Intro-page1-left-content1-line3-facebook')}/>
    //             <div className="circle1"/>
    //             <div className="circle1"/>
    //             <div className="circle2"/>
    //             <div className="circle2"/>
    //             <div className={cx('Intro-page1-left-content1-line3-write')}>
    //               <FaPen className="icon"/>
    //             </div>
    //           </div>
    //         </div>
    //         <div className={cx('Intro-page1-left-content2')}>
    //           <div className={cx('Intro-page1-left-content2-line1')}>
    //             <span>실명</span>과 <span>익명</span>으로 쉽게 전달
    //           </div>
    //           <div className={cx('Intro-page1-left-content2-line2')}>
    //             게시물을 작성할 때 실명과 익명 중에 하나를 선택해 쉽게 접근할 수 있어요!
    //           </div>
    //           <div className={cx('Intro-page1-left-content2-line3')}>
    //             <div className={cx('Intro-page1-left-content2-line3-item1')}>
    //               <MdPersonOutline className="icon"/>
    //             </div>
    //             <FiPlus className={cx('Intro-page1-left-content2-line3-item2')}/>
    //             <div className={cx('Intro-page1-left-content2-line3-item3')}>
    //               <MdPersonOutline className="icon"/>
    //               <FaQuestion className="icon2"/>
    //             </div>
    //           </div>
    //         </div>
    //         <Button
    //           customStyle={{width:'300px', height:'100px', fontSize: size.s6}}
    //           appearance={'secondary'}
    //           handleFunction={() => history.push('/bamboo')}       
    //         >
    //           대나무 숲 둘러보기
    //         </Button>
    //       </div>
    //       <div className={cx('Intro-page1-right')} data-aos="fade-left">
    //         <div className={cx('Intro-page1-right-top')}>
    //           <span className={cx('Intro-page1-right-top-ment')}>
    //             대소고 소통의 다리
    //           </span>
    //           <div className={cx('Intro-page1-right-top-title')}>
    //             <TiMessages className={cx('Intro-page1-right-top-title-icon')}/>
    //             <span className={cx('Intro-page1-right-top-title-text')}>
    //               SODA
    //             </span>
    //           </div>
    //         </div>
    //         <div className={cx('Intro-page1-right-bottom')}>
    //           <div className={cx('Intro-page1-right-bottom-box1')}>
    //             <img src={Bamboo1} all={'img'} className={'image'}/>
    //           </div>
    //           <div className={cx('Intro-page1-right-bottom-box2')}>
    //             <img src={Bamboo2} all={'img'} className={'image'}/>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Section>
    //   <Section className={'Intro-page2'}>
    //     <div className={cx('Intro-page2')}>
    //       <div className={cx('Intro-page2-left')} data-aos={'fade-right'}>
    //         <div className={cx('Intro-page2-left-title')}>
    //           대구소프트웨어고등학교<span>커뮤니티</span>
    //         </div>
    //         <div className={cx('Intro-page2-left-content1')}>
    //           <div className={cx('Intro-page2-left-content1-line1')}>
    //             <span>다양한 컨텐츠</span>들을 쉽고 편리하게 전달
    //           </div>
    //           <div className={cx('Intro-page2-left-content1-line2')}>
    //             자신의 관심 분야에 해당하는 컨텐츠들을 공유하고 소통할 수 있어요!
    //           </div>
    //           <div className={cx('Intro-page2-left-content1-line3')}>
    //             <div className={cx('Intro-page2-left-content1-line3-item1')}>
    //               <div className={cx('Intro-page2-left-content1-line3-item1-top')}>
    //                 <MdPeople className="people1"/>
    //                 <MdPeople className="people2"/>
    //                 <MdPeople className="people3"/>
    //               </div>
    //               <div className={cx('Intro-page2-left-content1-line3-item1-bottom')}>
    //                 <MdChat className="chat"/>
    //               </div>
    //             </div>
    //             <FiArrowRight className={cx('Intro-page2-left-content1-line3-item2')}/>
    //             <MdPublic className={cx('Intro-page2-left-content1-line3-item3')}/>
    //           </div>
    //         </div>
    //         <div className={cx('Intro-page2-left-content2')}>
    //           <div className={cx('Intro-page2-left-content2-line1')}>
    //             <span>Youtube API</span>를 이용한 영상 공유
    //           </div>
    //           <div className={cx('Intro-page2-left-content2-line2')}>
    //             <span className="span1">Youtube API</span>로 자신이 추천하는 <span className="span2">Youtube</span> 동영상을 공유할 수 있어요!
    //           </div>
    //           <div className={cx('Intro-page2-left-content2-line3')}>
    //             <TiSocialYoutubeCircular className={cx('Intro-page2-left-content2-line3-item1')}/>
    //             <MdThumbsUpDown className={cx('Intro-page2-left-content2-line3-item2')}/>
    //             <IoMdShare className={cx('Intro-page2-left-content2-line3-item3')}/>
    //           </div>
    //         </div>
    //         <Button
    //           customStyle={{width:'300px', height:'100px', fontSize: size.s6}}
    //           appearance={'tertiary'}
    //           handleFunction={() => history.push('/bamboo')}
    //         >
    //           커뮤니티 둘러보기
    //         </Button>
    //       </div>
    //       <div className={cx('Intro-page2-right')} data-aos={'fade-left'}>
    //         <div className={cx('Intro-page2-right-bottom')}>
    //           <div className={cx('Intro-page2-right-bottom-box1')}>
    //             참고사진
    //           </div>
    //           <div className={cx('Intro-page2-right-bottom-box2')}>
    //             참고사진
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Section>
    //   <Section className={'Intro-page3'}>
    //     <div className={cx('Intro-page3')}>
    //       <div className={cx('Intro-page3-top')}>
    //         <div className={cx('Intro-page3-top-left')} data-aos={'fade-right'}>
    //           <div className={cx('Intro-page3-top-left-title')}>
    //             대구소프트웨어고등학교<span>팀빌딩</span>
    //           </div>
    //           <div className={cx('Intro-page3-top-left-content1')}>
    //             <div className={cx('Intro-page3-top-left-content1-line1')}>
    //               <span>싱글</span>들을 위한 간편한 팀빌딩 서비스
    //             </div>
    //             <div className={cx('Intro-page3-top-left-content1-line2')}>
    //               여러명에서 같이 하고싶으면 팀원 모집 또는 신청을 할 수 있어요!
    //             </div>
    //             <div className={cx('Intro-page3-top-left-content1-line3')}>
    //               <div className={cx('Intro-page3-top-left-content1-line3-item1')}>
    //                 <div className={cx('Intro-page3-top-left-content1-line3-item1-top')}>
    //                   <MdPeople className="people1"/>
    //                   <MdPeople className="people2"/>
    //                   <MdPeople className="people3"/>
    //                 </div>
    //                 <div className={cx('Intro-page3-top-left-content1-line3-item1-bottom')}>
    //                   <MdChat className="chat"/>
    //                 </div>
    //               </div>
    //               <FiArrowRight className={cx('Intro-page3-top-left-content1-line3-item2')}/>
    //               <MdPublic className={cx('Intro-page3-top-left-content1-line3-item3')}/>
    //             </div>
    //           </div>
    //           <div className={cx('Intro-page3-top-left-content2')}>
    //             <div className={cx('Intro-page3-top-left-content2-line1')}>
    //               <span>온라인 면접</span>을 이용한 인재 착취
    //             </div>
    //             <div className={cx('Intro-page3-top-left-content2-line2')}>
    //               <span className="span1">온라인 면접</span>으로 자신이 원하는 <span className="span2">인재</span>를 구할 수 있어요!
    //             </div>
    //             <div className={cx('Intro-page3-top-left-content2-line3')}>
    //               <TiSocialYoutubeCircular className={cx('Intro-page3-top-left-content2-line3-item1')}/>
    //               <MdThumbsUpDown className={cx('Intro-page3-top-left-content2-line3-item2')}/>
    //               <IoMdShare className={cx('Intro-page3-top-left-content2-line3-item3')}/>
    //             </div>
    //           </div>
    //           <Button
    //             customStyle={{width:'300px', height:'100px', fontSize: size.s6}}
    //             appearance={'tertiary'}
    //             handleFunction={() => history.push('/bamboo')}
    //           >
    //             팀빌딩 둘러보기
    //           </Button>
    //         </div>
    //         <div className={cx('Intro-page3-top-right')} data-aos={'fade-left'}>
    //           <div className={cx('Intro-page3-top-right-bottom')}>
    //             <div className={cx('Intro-page3-top-right-bottom-box1')}>
    //               참고사진
    //             </div>
    //             <div className={cx('Intro-page3-top-right-bottom-box2')}>
    //               참고사진
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className={cx('Intro-page3-bottom')} data-aos={'fade-down'} data-aos-duration={'800'}>
    //         <Button
    //           customStyle={{width:'300px', height:'100px', fontSize: size.s6}}
    //           appearance={'outline'}
    //           handleFunction={() => history.push('/sign')}
    //         >
    //           SODA 로그인하기
    //         </Button>
    //       </div>
    //     </div>
    //   </Section>
    // </SectionsContainer>
    <div className={cx('Intro')}>
      <div className={cx('Intro-page1')}>
        <div className={cx('Intro-page1-left')} data-aos={'fade-right'}>
          <div className={cx('Intro-page1-left-title')}>
            대구소프트웨어고등학교<span>대나무 숲</span>
          </div>
          <div className={cx('Intro-page1-left-content1')}>
            <div className={cx('Intro-page1-left-content1-line1')}>
              <span>Facebook</span>을 통한 대소고인들과의 소통
            </div>
            <div className={cx('Intro-page1-left-content1-line2')}>
              <span>Facebook API</span>로 대나무 숲 전용 페이지에 게시물을 올릴 수 있어요!
            </div>
            <div className={cx('Intro-page1-left-content1-line3')}>
              <FaFacebookSquare className={cx('Intro-page1-left-content1-line3-facebook')}/>
              <div className="circle1"/>
              <div className="circle1"/>
              <div className="circle2"/>
              <div className="circle2"/>
              <div className={cx('Intro-page1-left-content1-line3-write')}>
                <FaPen className="icon"/>
              </div>
            </div>
          </div>
          <div className={cx('Intro-page1-left-content2')}>
            <div className={cx('Intro-page1-left-content2-line1')}>
              <span>실명</span>과 <span>익명</span>으로 쉽게 전달
            </div>
            <div className={cx('Intro-page1-left-content2-line2')}>
              게시물을 작성할 때 실명과 익명 중에 하나를 선택해 쉽게 접근할 수 있어요!
            </div>
            <div className={cx('Intro-page1-left-content2-line3')}>
              <div className={cx('Intro-page1-left-content2-line3-item1')}>
                <MdPersonOutline className="icon"/>
              </div>
              <FiPlus className={cx('Intro-page1-left-content2-line3-item2')}/>
              <div className={cx('Intro-page1-left-content2-line3-item3')}>
                <MdPersonOutline className="icon"/>
                <FaQuestion className="icon2"/>
              </div>
            </div>
          </div>
          <Button
            customStyle={{width:'300px', height:'100px', fontSize: size.s6}}
            appearance={'secondary'}
            handleFunction={() => history.push('/bamboo')}       
          >
            대나무 숲 둘러보기
          </Button>
        </div>
        <div className={cx('Intro-page1-right')} data-aos="fade-left">
          <div className={cx('Intro-page1-right-top')}>
            <span className={cx('Intro-page1-right-top-ment')}>
              대소고 소통의 다리
            </span>
            <div className={cx('Intro-page1-right-top-title')}>
              <TiMessages className={cx('Intro-page1-right-top-title-icon')}/>
              <span className={cx('Intro-page1-right-top-title-text')}>
                SODA
              </span>
            </div>
          </div>
          <div className={cx('Intro-page1-right-bottom')}>
            <div className={cx('Intro-page1-right-bottom-box1')}>
              <img src={Bamboo1} all={'img'} className={'image'}/>
            </div>
            <div className={cx('Intro-page1-right-bottom-box2')}>
              <img src={Bamboo2} all={'img'} className={'image'}/>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('Intro-page2')}>
        <div className={cx('Intro-page2-left')} data-aos={'fade-right'}>
          <div className={cx('Intro-page2-left-title')}>
            대구소프트웨어고등학교<span>커뮤니티</span>
          </div>
          <div className={cx('Intro-page2-left-content1')}>
            <div className={cx('Intro-page2-left-content1-line1')}>
              <span>다양한 컨텐츠</span>들을 쉽고 편리하게 전달
            </div>
            <div className={cx('Intro-page2-left-content1-line2')}>
              자신의 관심 분야에 해당하는 컨텐츠들을 공유하고 소통할 수 있어요!
            </div>
            <div className={cx('Intro-page2-left-content1-line3')}>
              <div className={cx('Intro-page2-left-content1-line3-item1')}>
                <div className={cx('Intro-page2-left-content1-line3-item1-top')}>
                  <MdPeople className="people1"/>
                  <MdPeople className="people2"/>
                  <MdPeople className="people3"/>
                </div>
                <div className={cx('Intro-page2-left-content1-line3-item1-bottom')}>
                  <MdChat className="chat"/>
                </div>
              </div>
              <FiArrowRight className={cx('Intro-page2-left-content1-line3-item2')}/>
              <MdPublic className={cx('Intro-page2-left-content1-line3-item3')}/>
            </div>
          </div>
          <div className={cx('Intro-page2-left-content2')}>
            <div className={cx('Intro-page2-left-content2-line1')}>
              <span>Youtube API</span>를 이용한 영상 공유
            </div>
            <div className={cx('Intro-page2-left-content2-line2')}>
              <span className="span1">Youtube API</span>로 자신이 추천하는 <span className="span2">Youtube</span> 동영상을 공유할 수 있어요!
            </div>
            <div className={cx('Intro-page2-left-content2-line3')}>
              <TiSocialYoutubeCircular className={cx('Intro-page2-left-content2-line3-item1')}/>
              <MdThumbsUpDown className={cx('Intro-page2-left-content2-line3-item2')}/>
              <IoMdShare className={cx('Intro-page2-left-content2-line3-item3')}/>
            </div>
          </div>
          <Button
            customStyle={{width:'300px', height:'100px', fontSize: size.s6}}
            appearance={'tertiary'}
            handleFunction={() => history.push('/bamboo')}
          >
            커뮤니티 둘러보기
          </Button>
        </div>
        <div className={cx('Intro-page2-right')} data-aos={'fade-left'}>
          <div className={cx('Intro-page2-right-bottom')}>
            <div className={cx('Intro-page2-right-bottom-box1')}>
              참고사진
            </div>
            <div className={cx('Intro-page2-right-bottom-box2')}>
              참고사진
            </div>
          </div>
        </div>
      </div>
      <div className={cx('Intro-page3')}>
        <div className={cx('Intro-page3-top')}>
          <div className={cx('Intro-page3-top-left')} data-aos={'fade-right'}>
            <div className={cx('Intro-page3-top-left-title')}>
              대구소프트웨어고등학교<span>팀빌딩</span>
            </div>
            <div className={cx('Intro-page3-top-left-content1')}>
              <div className={cx('Intro-page3-top-left-content1-line1')}>
                <span>싱글</span>들을 위한 간편한 팀빌딩 서비스
              </div>
              <div className={cx('Intro-page3-top-left-content1-line2')}>
                여러명에서 같이 하고싶으면 팀원 모집 또는 신청을 할 수 있어요!
              </div>
              <div className={cx('Intro-page3-top-left-content1-line3')}>
                <div className={cx('Intro-page3-top-left-content1-line3-item1')}>
                  <div className={cx('Intro-page3-top-left-content1-line3-item1-top')}>
                    <MdPeople className="people1"/>
                    <MdPeople className="people2"/>
                    <MdPeople className="people3"/>
                  </div>
                  <div className={cx('Intro-page3-top-left-content1-line3-item1-bottom')}>
                    <MdChat className="chat"/>
                  </div>
                </div>
                <FiArrowRight className={cx('Intro-page3-top-left-content1-line3-item2')}/>
                <MdPublic className={cx('Intro-page3-top-left-content1-line3-item3')}/>
              </div>
            </div>
            <div className={cx('Intro-page3-top-left-content2')}>
              <div className={cx('Intro-page3-top-left-content2-line1')}>
                <span>온라인 면접</span>을 이용한 인재 착취
              </div>
              <div className={cx('Intro-page3-top-left-content2-line2')}>
                <span className="span1">온라인 면접</span>으로 자신이 원하는 <span className="span2">인재</span>를 구할 수 있어요!
              </div>
              <div className={cx('Intro-page3-top-left-content2-line3')}>
                <TiSocialYoutubeCircular className={cx('Intro-page3-top-left-content2-line3-item1')}/>
                <MdThumbsUpDown className={cx('Intro-page3-top-left-content2-line3-item2')}/>
                <IoMdShare className={cx('Intro-page3-top-left-content2-line3-item3')}/>
              </div>
            </div>
            <Button
              customStyle={{width:'300px', height:'100px', fontSize: size.s6}}
              appearance={'tertiary'}
              handleFunction={() => history.push('/bamboo')}
            >
              팀빌딩 둘러보기
            </Button>
          </div>
          <div className={cx('Intro-page3-top-right')} data-aos={'fade-left'}>
            <div className={cx('Intro-page3-top-right-bottom')}>
              <div className={cx('Intro-page3-top-right-bottom-box1')}>
                참고사진
              </div>
              <div className={cx('Intro-page3-top-right-bottom-box2')}>
                참고사진
              </div>
            </div>
          </div>
        </div>
        <div className={cx('Intro-page3-bottom')} data-aos={'fade-down'} data-aos-duration={'800'}>
          <Button
            customStyle={{width:'300px', height:'100px', fontSize: size.s6}}
            appearance={'outline'}
            handleFunction={() => history.push('/sign')}
          >
            SODA 로그인하기
          </Button>
        </div>
        
      </div>
    </div>
  );
};

Intro.propTypes = {
  history: PropTypes.object
};

export default withRouter(Intro);