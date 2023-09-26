import axios from 'axios';
import {alert} from 'utils/alert';
import {showToast} from 'utils/toast';

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

export const fetchDetailData = async (BoardId: string) => {
  try {
    const result = await axios.get(`/board/getOne/${BoardId}`);
    return result.data.replys;
  } catch (e) {
    showToast('댓글을 불러오는 데 실패하였습니다.');
  }
};
