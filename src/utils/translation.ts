export const changeTopicToKorean = (topic: string | undefined) => {
  switch (topic) {
    case 'Tip':
      return '꿀팁';
    case 'Backbiting':
      return '뒷담';
    case 'Salary':
      return '연봉';
    case 'Turnover':
      return '이직';
    case 'Free':
      return '자유';
    case 'Humor':
      return '유머';
  }
};

export const changeTopicToEnglish = (topic: string) => {
  switch (topic) {
    case '꿀팁':
      return 'Tip';
    case '뒷담':
      return 'Backbiting';
    case '연봉':
      return 'Salary';
    case '이직':
      return 'Turnover';
    case '자유':
      return 'Free';
    case '유머':
      return 'Humor';
    default:
      return 'Free';
  }
};
