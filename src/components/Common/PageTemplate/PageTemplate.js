import  React, { useState, useEffect }  from 'react';
import style from './PageTemplate.scss';
import { IoMdMenu, IoMdSearch, IoMdPaperPlane, IoIosLaptop } from 'react-icons/io';
import { TiMessages, TiStarOutline, TiPencil } from 'react-icons/ti';
import { MdLibraryBooks } from 'react-icons/md'
import { GoShield } from 'react-icons/go';
import { GiSofa, GiSiren } from 'react-icons/gi';
import { FaBasketballBall, FaPen } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import classNames from 'classnames/bind';
import PropTypes  from 'prop-types';

const cx = classNames.bind(style);

const PageTemplate = ({ pageType, children }) => {
  const [isSearch, setIsSearch] = useState([]);
  const [isOpenNevBar, setIsOpenNevBar] = useState(false);
  const [nevBar, setNevBar] = useState([]);
  const [nevBarContents, setNevBarContents] = useState([]);

  const name = 'GUEST';

  const setSearchInput = () => {
    if (pageType === 'Soda') {
      setIsSearch(
        <div className={cx('PageTemplate-SearchInputDiv')}>
          <input className={cx('PageTemplate-SearchInputDiv-SearchInput')}/>
          <button className={cx('PageTemplate-SearchInputDiv-SearchButton')}>
            <IoMdSearch className={cx('PageTemplate-SearchInputDiv-SearchButton-SearchButtonIcon')}/>
          </button>
        </div>
      )
    }
  }

  // const nevBarSetting = () => {
  //   setNevBarContents(
  //   )
  // }

  const handleNevBar = () => {
    if (pageType === 'Soda') {
      setNevBar(
        <div className={cx('PageTemplate-NevBar')}>
          <div className={cx('PageTemplate-NevBar-Title')}>
            <button className={cx('PageTemplate-NevBar-Title-NevButton')} onClick={() => closeNevBar()}>
              <IoMdMenu className={cx('PageTemplate-NevBar-Title-NevImage', `NevBar-${pageType}`)}/>
            </button>
            <TiMessages className={cx('PageTemplate-NevBar-Title-Image', `NevBar-${pageType}`)}/>
            <p className={cx('PageTemplate-NevBar-Title-Text', `NevBar-${pageType}`)}>SODA</p>
          </div>
          <div className={cx('PageTemplate-NevBar-Main')}>
            <div className={cx('PageTemplate-NevBar-Main-Page')}>
              <TiMessages className={cx('PageTemplate-NevBar-Main-Page-Image')}/>
              <a href="http://localhost:3000/" className={cx('PageTemplate-NevBar-Main-Page-Link')}>메인</a>
            </div>
            <div className={cx('PageTemplate-NevBar-Main-HotFeed')}>
              <TiStarOutline className={cx('PageTemplate-NevBar-Main-HotFeed-Image')}/>
              <a href="http://localhost:3000/" className={cx('PageTemplate-NevBar-Main-HotFeed-Link')}>오늘의 핫한 게시물</a>
            </div>
          </div>
          <div className={cx('PageTemplate-NevBar-Bamboo')}>
            <div className={cx('PageTemplate-NevBar-Bamboo-Title')}>
              <div className={cx('PageTemplate-NevBar-Bamboo-Title-Contents')}>대나무 숲</div>
              <hr className={cx('PageTemplate-NevBar-Bamboo-Title-Line')}></hr>
            </div>
            <div className={cx('PageTemplate-NevBar-Bamboo-Feed')}>
              <MdLibraryBooks className={cx('PageTemplate-NevBar-Bamboo-Feed-Image')}/>
              <a className={cx('PageTemplate-NevBar-Bamboo-Feed-Link')} href="http://localhost:3000/bamboo" >대숲피드</a>
            </div>
            <div className={cx('PageTemplate-NevBar-Bamboo-Tip')}>
              <IoMdPaperPlane className={cx('PageTemplate-NevBar-Bamboo-Tip-Image')}/>
              <a className={cx('PageTemplate-NevBar-Bamboo-Tip-Link')} href="http://localhost:3000/">대숲 제보하기</a>
            </div>
            <div className={cx('PageTemplate-NevBar-Bamboo-Admin')}>
              <GoShield className={cx('PageTemplate-NevBar-Bamboo-Admin-Image')}/>
              <a className={cx('PageTemplate-NevBar-Bamboo-Admin-Link')} href="http://localhost:3000/">관리자</a>
            </div>
          </div>
          <div className={cx('PageTemplate-NevBar-Community')}>
            <div className={cx('PageTemplate-NevBar-Community-Title')}>
              <div className={cx('PageTemplate-NevBar-Community-Title-Contents')}>커뮤니티</div>
              <hr className={cx('PageTemplate-NevBar-Community-Title-Line')}></hr>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-Develop')}>
              <IoIosLaptop className={cx('PageTemplate-NevBar-Community-Develop-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-Develop-Link')}>개발</button>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-Develop')}>
              <TiPencil className={cx('PageTemplate-NevBar-Community-Study-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-Study-Link')}>학업</button>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-DailyLife')}>
              <GiSofa className={cx('PageTemplate-NevBar-Community-DailyLife-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-DailyLife-Link')}>일상</button>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-Hobby')}>
              <FaBasketballBall className={cx('PageTemplate-NevBar-Community-Hobby-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-Hobby-Link')}>취미</button>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-Tendinous')}>
              <GiSiren className={cx('PageTemplate-NevBar-Community-Tendinous-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-Tendinous-Link')}>건의</button>
            </div>
          </div>
          <div className={cx('PageTemplate-NevBar-TeamBuilding')}>
            <div className={cx('PageTemplate-NevBar-TeamBuilding-Title')}>
              <div className={cx('PageTemplate-NevBar-TeamBuilding-Title-Contents')}>팀 빌딩</div>
              <hr className={cx('PageTemplate-NevBar-TeamBuilding-Title-Line')}></hr>
            </div>
            <div className={cx('PageTemplate-NevBar-TeamBuilding-Apply')}>
              <FaPen className={cx('PageTemplate-NevBar-TeamBuilding-Apply-Image')}/>
              <button className={cx('PageTemplate-NevBar-TeamBuilding-Apply-Link')}>모집 및 신청</button>
            </div>
            <div className={cx('PageTemplate-NevBar-TeamBuilding-Interview')}>
              <FiPhoneCall className={cx('PageTemplate-NevBar-TeamBuilding-Interview-Image')}/>
              <button className={cx('PageTemplate-NevBar-TeamBuilding-Interview-Link')}>온라인 면접</button>
            </div>
          </div>
          <div className={cx('PageTemplate-NevBar-Source')}>
            Make By takeUp
          </div>
        </div>
      );
    } else if (pageType === 'Bamboo') {
      setNevBar(
        <div className={cx('PageTemplate-NevBar')}>
          <div className={cx('PageTemplate-NevBar-Title')}>
            <button className={cx('PageTemplate-NevBar-Title-NevButton')} onClick={() => closeNevBar()}>
              <IoMdMenu className={cx('PageTemplate-NevBar-Title-NevImage', `NevBar-${pageType}`)}/>
            </button>
            <TiMessages className={cx('PageTemplate-NevBar-Title-Image', `NevBar-${pageType}`)}/>
            <p className={cx('PageTemplate-NevBar-Title-Text', `NevBar-${pageType}`)}>SODA</p>
          </div>
          <div className={cx('PageTemplate-NevBar-Main')}>
            <div className={cx('PageTemplate-NevBar-Main-Page')}>
              <TiMessages className={cx('PageTemplate-NevBar-Main-Page-Image')}/>
              <a href="http://localhost:3000/" className={cx('PageTemplate-NevBar-Main-Page-Link')}>메인</a>
            </div>
            <div className={cx('PageTemplate-NevBar-Main-HotFeed')}>
              <TiStarOutline className={cx('PageTemplate-NevBar-Main-HotFeed-Image')}/>
              <a href="http://localhost:3000/" className={cx('PageTemplate-NevBar-Main-HotFeed-Link')}>오늘의 핫한 게시물</a>
            </div>
          </div>
          <div className={cx('PageTemplate-NevBar-Bamboo')}>
            <div className={cx('PageTemplate-NevBar-Bamboo-Title')}>
              <div className={cx('PageTemplate-NevBar-Bamboo-Title-Contents')}>대나무 숲</div>
              <hr className={cx('PageTemplate-NevBar-Bamboo-Title-Line')}></hr>
            </div>
            <div className={cx('PageTemplate-NevBar-Bamboo-Feed')}>
              <MdLibraryBooks className={cx('PageTemplate-NevBar-Bamboo-Feed-Image')}/>
              <a className={cx('PageTemplate-NevBar-Bamboo-Feed-Link')} href="http://localhost:3000/bamboo" >대숲피드</a>
            </div>
            <div className={cx('PageTemplate-NevBar-Bamboo-Tip')}>
              <IoMdPaperPlane className={cx('PageTemplate-NevBar-Bamboo-Tip-Image')}/>
              <a className={cx('PageTemplate-NevBar-Bamboo-Tip-Link')} href="http://localhost:3000/">대숲 제보하기</a>
            </div>
            <div className={cx('PageTemplate-NevBar-Bamboo-Admin')}>
              <GoShield className={cx('PageTemplate-NevBar-Bamboo-Admin-Image')}/>
              <a className={cx('PageTemplate-NevBar-Bamboo-Admin-Link')} href="http://localhost:3000/">관리자</a>
            </div>
          </div>
          <div className={cx('PageTemplate-NevBar-Community')}>
            <div className={cx('PageTemplate-NevBar-Community-Title')}>
              <div className={cx('PageTemplate-NevBar-Community-Title-Contents')}>커뮤니티</div>
              <hr className={cx('PageTemplate-NevBar-Community-Title-Line')}></hr>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-Develop')}>
              <IoIosLaptop className={cx('PageTemplate-NevBar-Community-Develop-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-Develop-Link')}>개발</button>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-Develop')}>
              <TiPencil className={cx('PageTemplate-NevBar-Community-Study-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-Study-Link')}>학업</button>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-DailyLife')}>
              <GiSofa className={cx('PageTemplate-NevBar-Community-DailyLife-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-DailyLife-Link')}>일상</button>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-Hobby')}>
              <FaBasketballBall className={cx('PageTemplate-NevBar-Community-Hobby-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-Hobby-Link')}>취미</button>
            </div>
            <div className={cx('PageTemplate-NevBar-Community-Tendinous')}>
              <GiSiren className={cx('PageTemplate-NevBar-Community-Tendinous-Image')}/>
              <button className={cx('PageTemplate-NevBar-Community-Tendinous-Link')}>건의</button>
            </div>
          </div>
          <div className={cx('PageTemplate-NevBar-TeamBuilding')}>
            <div className={cx('PageTemplate-NevBar-TeamBuilding-Title')}>
              <div className={cx('PageTemplate-NevBar-TeamBuilding-Title-Contents')}>팀 빌딩</div>
              <hr className={cx('PageTemplate-NevBar-TeamBuilding-Title-Line')}></hr>
            </div>
            <div className={cx('PageTemplate-NevBar-TeamBuilding-Apply')}>
              <FaPen className={cx('PageTemplate-NevBar-TeamBuilding-Apply-Image')}/>
              <button className={cx('PageTemplate-NevBar-TeamBuilding-Apply-Link')}>모집 및 신청</button>
            </div>
            <div className={cx('PageTemplate-NevBar-TeamBuilding-Interview')}>
              <FiPhoneCall className={cx('PageTemplate-NevBar-TeamBuilding-Interview-Image')}/>
              <button className={cx('PageTemplate-NevBar-TeamBuilding-Interview-Link')}>온라인 면접</button>
            </div>
          </div>
          <div className={cx('PageTemplate-NevBar-Source')}>
            Make By takeUp
          </div>
        </div>
      )
    }
  };

  const openNevBar = () => {
    setIsOpenNevBar(true);
  };

  const closeNevBar = () => {
    setIsOpenNevBar(false)
  }

  useEffect(() => {
    setSearchInput();
    handleNevBar();
    // nevBarSetting();
  }, []);

  return (
    <div className={cx('PageTemplate', `${pageType}`)}>
      <div className="PageTemplate-Title">
        <button className={cx('PageTemplate-Title-NevButton')} onClick={() => openNevBar()}>
          <IoMdMenu className="PageTemplate-Title-NevImage"/>
        </button>
        <TiMessages className="PageTemplate-Title-Image"/>
        <p className="PageTemplate-Title-Text">SODA</p>
      </div>
      {
        isSearch
      }
      <div className="PageTemplate-Profile">
        <div className="PageTemplate-Profile-Name">
          {
            name
          }
        </div>
        <div className="PageTemplate-Profile-ImageBorder">
          <img className="PageTemplate-Profile-Image" src="http://54.180.86.178:9000/image/png/1583933764710.png"></img>
        </div>
      </div>
      {
        isOpenNevBar && (
          nevBar
        )
      }
      {
        children
      }
    </div>
  );
};

PageTemplate.propTypes = {
  
}

export default PageTemplate;