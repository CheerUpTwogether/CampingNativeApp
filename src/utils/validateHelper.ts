// 이메일 유효성 검사
export const getEmailValid = email => {
    if (!email) {
      return '이메일을 입력해주세요';
    }
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!regex.test(email)) {
      return '이메일 형식에 맞게 입력해주세요.';
    }
  
    return false;
  };
  
  // 패스워드 유효성 검사
  export const getPasswordValid = password => {
    /* 회원가입 시 비밀번호는 8~20, 최소 하나의 영어소문자, 영어 대문자, 특수 문자, 숫자 이상 포함되어야 합니다 */
    if (!password) {
      return '비밀번호를 입력해주세요.';
    }
  
    const regex =
      /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!regex.test(password)) {
      return '대/소문자, 특수 문자, 숫자를 포함하여 8글자 이상 입력하세요.';
    }
  
    if (password.length > 20) {
      return '비밀번호는 20자 이하로만 입력해주세요';
    }
  
    return false;
  };
  
  // 패스워드 확인 유효성 검사
  export const getPasswordCheckValid = (password, passwordCheck) => {
    if (!passwordCheck) {
      return '비밀번호 확인을 입력해주세요.';
    }
  
    if (password !== passwordCheck) {
      return '비밀번호와 일치하지 않습니다.';
    }
  
    return false;
  };
  
  // 닉네임 유효성 검사
  export const getNicknameValid = nickname => {
    if (nickname.length < 2) {
      return '2글자 이상의 닉네임을 입력해주세요.';
    }
  
    if (nickname.length > 8) {
      return '8글자 이상의 닉네임을 입력해주세요.';
    }
  
    return false;
  };
  
  // 회원가입 유효성 검사
  export const registValid = form => {
    if (
      getEmailValid(form.email) 
      getPasswordValid(form.password) 
      getPasswordCheckValid(form.password, form.passwordCheck) ||
      getNicknameValid(form.nickname)
    ) {
      return false;
    }
    return true;
  };