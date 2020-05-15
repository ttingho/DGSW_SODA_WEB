/* image src가 null 값으로 들어오는지 확인하여 
null이라면 defaultSrc, 아니라면 image src를 반환합니다. */

const ImageSrc = (src, defaultSrc) => {
  if (src !== null && src !== undefined) {
    const isNull1 = src.indexOf('false/null'); // 사용자가 회원가입 후 프로필을 설정하지 않았을때 디폴트 사진 처리
    const isNull2 = src.indexOf('apinull'); // 사용자가 회원가입 후 프로필을 설정하지 않았을때 디폴트 사진 처리
    const isNull3 = src.indexOf('api/null'); // 사용자가 회원가입 후 프로필을 설정하지 않았을때 디폴트 사진 처리
    const isNull4 = src.indexOf('null.null'); // 사용자가 회원가입 후 프로필을 설정하지 않았을때 디폴트 사진 처리
    const insUndefined = src.indexOf('undefined');  // undefined 예외처리

    if (insUndefined === -1 && isNull1 === -1 && isNull2 === -1 && isNull3 === -1 && isNull4 === -1 && src !== '') {
      return src;
    } else {
      return defaultSrc;  
    }
  } else {
    return defaultSrc;
  }
};

export default ImageSrc;