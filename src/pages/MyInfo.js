import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import MyInfoContainer from 'containers/MyInfo';

const MyInfo = () => {
  return (
    <>
      <PageTemplate pageType={'inquiry'} url={'myinfo'}>
        <MyInfoContainer/>
      </PageTemplate>
    </>
  );
};

export default MyInfo;