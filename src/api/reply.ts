import axios from 'axios';
import {alert} from 'utils/alert';

export const requestRegisterReply = async (formData: FormData) => {
  try {
    const result = await axios.post('/reply/create', formData, {
      headers: {
        'Content-topic': 'multipart/form-data',
      },
    });
    return result.data;
  } catch (e: any) {
    alert({
      title: '댓글 등록 실패',
      body: `댓글 등록에 실패하였습니다\n${e.message}`,
    });
    return false;
  }
};
