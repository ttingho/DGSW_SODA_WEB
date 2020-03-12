import  React, { useState, useEffect }  from 'react';
import style from './PageTemplate.scss';
import { IoMdMenu, IoMdSearch } from 'react-icons/io';
import { TiMessages } from 'react-icons/ti';
import classNames from 'classnames/bind';
import PropTypes  from 'prop-types';

const cx = classNames.bind(style);

const PageTemplate = ({ pageType, children }) => {
  const [isSearch, setIsSearch] = useState([]);

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

  useEffect(() => {
    setSearchInput();
  }, []);

  return (
    <div className={cx('PageTemplate', `${pageType}`)}>
      <div className="PageTemplate-Title">
        <button className={cx('PageTemplate-Title-NevButton')}>
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
        children
      }
    </div>
  );
};

PageTemplate.propTypes = {
  
}

export default PageTemplate;