const validateEmail = (value: string) => {
  const re =
    // (특수 기호들 제외 문자 + .다음에 특수기호 제외 문자) or 따옴표 안에 문자들 @ ip주소(123.123.123.123) or 영문자, 하이픈, 숫자 . 영문자 2개 이상
    // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // 영문자, 숫자로 시작한다, 영문자, 숫자, 하이픈, 언더바만 가능하다. @ 뒤에는 ip주소(123.123.123.123) or 영문자, 하이픈, 숫자 . 영문자 2개 이상
    /^[a-zA-Z0-9_-]{3,}[a-zA-Z0-9_-]*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

const validateUserName = (input: string) => {
  try {
    const re = /^[가-힣|a-z|A-Z]{2,}$/;
    if (!re.test(input)) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
    // return { error: err.message };
  }
};

const validatePWD = (password: string) => {
  // Minimum eight characters, at least one letter and one number:
  // const re = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

  // Minimum eight characters, at least one letter, one number and one special character:
  // const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // 최소 영문자 1글자, 최소 특수문자(문자, 숫자, 공백이 아닌 것들) 또는 숫자 1글자, 공백 불가
  const re =
    /^(?=.*[A-Za-z])(?=.*([^\w\d\s]|[0-9]))(?!.*\s)([A-Za-z0-9]|[^\w\d\s]).{7,}$/;

  // 최소 영문자 1글자 + 숫자 + 특수문자 3가지 조합만 가능,  특수기호는 32가지(~․!@#$%^&*()_-+=[]{}|\;:‘“<>,.?/)만 허용, 공백불가, 영문자, 숫자, 특수문자 제외한 모든 것 불가, 최소 9글자
  // const re =
  //   /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~․!@#$%^&*()_\-+=[\]{}|\\;:‘“<>,.?/])(?!.*\s)(?!.*[^a-zA-Z0-9~․!@#$%^&*()_\-+=[\]{}|\\;:‘“<>,.?/]).{9,}$/;

  return re.test(password);

  // // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
};

export {validateEmail, validatePWD, validateUserName};
