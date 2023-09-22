export const changeTopicToKorean = (topic: string) => {
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
