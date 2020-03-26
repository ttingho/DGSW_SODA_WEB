
const SignUpFormCheck = (data, pageType) => {
  if (pageType === 1) {
    const { id, pw, pwCheck } = data;

    if (!(!!id && !!pw && !!pwCheck)) {
      return {
        isFormCheck: false,
        text: '양식이 비어있습니다.',
        type: 'warning'
      };
    } else if (!(/^[a-zA-Z0-9]{5,20}$/).test(id)) {
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
    } else if (!(pw === pwCheck)) {
      return {
        isFormCheck: false,
        text: '비밀번호가 일치하지 않습니다.',
        type: 'warning'
      };
    }
  } else if (pageType === 2) {
    const { email, phone, name } = data;

    if (!(!!email && !!phone && !!name)) {
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
    } else if (!(/^\d{3}\d{4}\d{4}$/).test(phone)) {
      return {
        isFormCheck: false,
        text: '전화번호 형식을 지켜주세요.',
        type: 'warning'
      };
    } else if (!(/^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]{2,12}$/).test(name)) {
      return {
        isFormCheck: false,
        text: '이름 형식을 지켜주세요.',
        type: 'warning'
      };
    }
  }

  return {
    isFormCheck: true,
    text: '',
    type: ''
  };
};

export default SignUpFormCheck;
