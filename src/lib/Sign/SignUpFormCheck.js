
const SignUpFormCheck = (data, pageType) => {
  if (pageType === 1) {
    const { id, idCheck, pw, checkPw } = data;

    if (!(!!id && !!pw && !!checkPw)) {
      return {
        isFormCheck: false,
        text: '양식이 비어있습니다.',
        type: 'warning'
      };
    } else if (!(/^[a-zA-Z0-9]{4,20}$/).test(id)) {
      return {
        isFormCheck: false,
        text: '아이디 형식을 지켜주세요.',
        type: 'warning'
      };
    } else if (!(/^[a-zA-Z0-9!@#$%^*+=-]{7,20}$/).test(pw)) {
      return {
        isFormCheck: false,
        text: '비밀번호 형식을 지켜주세요.',
        type: 'warning'
      };
    } else if (!(pw === checkPw)) {
      return {
        isFormCheck: false,
        text: '비밀번호가 일치하지 않습니다.',
        type: 'warning'
      };
    } else if (idCheck === 2) {
      return {
        isFormCheck: false,
        text: '이미 존재하는 아이디입니다.',
        type: 'warning'
      };
    }
  } else if (pageType === 2) {
    const { email, name, isCheckedEmail } = data;

    if (!(!!email && !!name)) {
      return {
        isFormCheck: false,
        text: '양식이 비어있습니다.',
        type: 'warning'
      };
    } else if (!(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i).test(email)) {
      return {
        isFormCheck: false,
        text: '이메일 형식을 지켜주세요.',
        type: 'warning'
      };
    } else if (!(/^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]{2,12}$/).test(name)) {
      return {
        isFormCheck: false,
        text: '이름 형식을 지켜주세요.',
        type: 'warning'
      };
    } 
    // else if (!(/^[\wㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/).test(nickName)) {
    //   return {
    //     isFormCheck: false,
    //     text: '닉네임 형식을 지켜주세요.',
    //     type: 'warning'
    //   };
    // } else if (isCheckedEmail !== true) {
    //   return {
    //     isFormCheck: false,
    //     text: '이메일을 검증 해주세요.',
    //     type: 'warning'
    //   };
    // }
  }

  return {
    isFormCheck: true,
    text: '',
    type: ''
  };
};

export default SignUpFormCheck;
