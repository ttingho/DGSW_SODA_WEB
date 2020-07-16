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
import BambooLoading from 'components/Bamboo/BambooLoading';

const page = 1;

const BambooContainer = observer(()=> {
  const { store } = useStores();

  const { getBambooFeed, bambooList } = store.bamboo;
  const { getMyInfo, userProfileImage } = store.member;
  const { isModal } = store.sign;

  const [feeds, setFeeds] = useState([]);
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isObserver, setIsObserver] = useState(true);
  const [limit, setLimit] = useState(5);

  // 초기 데이터 설정
  const handleBamboo =  useCallback(async () => {
    await getBambooFeed(page, limit);
    
    setFeeds(bambooList.map((feed) => <BambooItem key={feed.idx} item={feed}/>));
  }, []);

  // 2초 텀 두기
  const fetch = (delay) => new Promise(res => setTimeout(function(){ 
    setLimit(limit + 5);
    res(setIsLoading(false));
  }, delay));

  // 서버로부터 추가 데이터 들고 오기
  const getMoreBambooFeeds = async () => {
    if (isObserver) {
      // delay
      await fetch(2000);
      const { bamboo } = await getBambooFeed(page, limit);
      
      // 마지막 게시물 조회가 끝났을경우
      if (limit > bamboo.length) {

        setIsObserver(false);
      }

      setFeeds(bamboo.map((feed) => <BambooItem key={feed.idx} item={feed}/>));
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

  useEffect(() => {
    handleBamboo();
  }, []);

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

  useEffect(() => {
    setFeeds(bambooList.map((feed) => <BambooItem key={feed.idx} item={feed} postLimit={limit} />));
  }, [bambooList]);

  return (
    <>
      <BambooTemplate>
        {
          feeds
        }
        <div className={'Loading'} ref={setTarget}>
          {
            isLoading && isObserver && <BambooLoading />
          }
        </div>
      </BambooTemplate>
    </>
  );
});

export default BambooContainer;