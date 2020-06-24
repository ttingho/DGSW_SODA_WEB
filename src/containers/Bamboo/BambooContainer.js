import React, {useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import BambooTemplate from 'components/Bamboo/BambooTemplate';
import BambooItem from 'containers/Bamboo/BambooItem';
import './Load.scss';
import useStores from 'lib/HookState/useStore';
import SecureLS from 'secure-ls';
import DEFAULT_PROFILE from 'assets/image/profile/profile.svg';
import ImageSrc from 'lib/Profile/ImageSrc';
import TokenVerification from 'lib/Token/TokenVerification';

const page = 1;
let limit = 5;

const BambooContainer = observer(()=> {
  const { store } = useStores();

  const { getBambooFeed } = store.bamboo;
  const { getMyInfo, userProfileImage } = store.member;
  const { isModal } = store.sign;
  const token = TokenVerification();

  const [feeds, setFeeds] = useState([]);
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isObserver, setIsObserver] = useState(true);

  const ls = new SecureLS({ encodingType: 'aes' });
  const userInfo = ls.get('user-info');
  const src = userInfo.profileImage;

  const [userProfile, setUserProfile] = useState(DEFAULT_PROFILE);

  const handleImageError = useCallback(e => {
    setUserProfile(DEFAULT_PROFILE);
  }, []);

  // 초기 데이터 설정
  const handleBamboo =  useCallback(async () => {
    const data = await getBambooFeed(page, limit);
    
    const bambooInfo = data.bamboo;

    setFeeds(bambooInfo.map((feed) => <BambooItem key={feed.idx} token={token} item={feed} userProfile={userProfile} handleImageError={handleImageError}/>));
  }, []);

  // 2초 텀 두기
  const fetch = (delay) => new Promise(res => setTimeout(function(){ 
    limit += 5;
    res(setIsLoading(false));
  }, delay));

  // 서버로부터 추가 데이터 들고 오기
  const getMoreBambooFeeds = async () => {
    if (isObserver) {
      // delay
      await fetch(2000);
      const data = await getBambooFeed(page, limit);
      const bambooInfo = data.bamboo;
      
      // 마지막 게시물 조회가 끝났을경우
      if (limit > bambooInfo.length) {

        setIsObserver(false);
      }

      setFeeds(bambooInfo.map((feed) => <BambooItem key={feed.idx} token={token} item={feed} userProfile={userProfile} handleImageError={handleImageError}/>));
    }
  };

  // 스크롤 바닥 닿았을 경우 이벤트 처리
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && isObserver && !isLoading) {
      observer.unobserve(entry.target);
      setIsLoading(true);
      observer.observe(entry.target);
    }
  };

  async function fetchData() {
    await getMyInfo();
  }

  useEffect(() => {
    handleBamboo();
  }, []);

  useEffect(() => {
    if (token === 'empty') {
      localStorage.removeItem('soda-token');
      localStorage.removeItem('soda-reToken');
      sessionStorage.removeItem('soda-token');
      sessionStorage.removeItem('soda-reToken');
      ls.removeAll();
      setUserProfile(DEFAULT_PROFILE);
      console.log('no token');
    } else {
      fetchData();
      console.log('src:', src);
      setUserProfile(ImageSrc(src, DEFAULT_PROFILE));
      console.log('test: ', userProfile);
    }
  }, [token, src, userProfileImage]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  });

  useEffect(() => {
    getMoreBambooFeeds();
  }, [isLoading]);

  return (
    <>
      <BambooTemplate>
        {
          feeds
        }
        <div className={'Loading'} ref={setTarget}>
          {
            isLoading && isObserver && 'Loading...'
          }
        </div>
      </BambooTemplate>
    </>
  );
});

export default BambooContainer;