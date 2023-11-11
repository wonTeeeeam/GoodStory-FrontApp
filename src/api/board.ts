import axios from 'axios';
import {alert} from 'utils/alert';

export const requestNewPosting = async (formData: FormData) => {
  try {
    await axios.post('/board/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return true;
  } catch (e: any) {
    alert({
      title: '게시글 등록 실패',
      body: `게시글 등록에 실패했습니다.\n${e.message}`,
    });
  }
  return false;
};
