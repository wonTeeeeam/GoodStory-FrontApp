import {AxiosResponse} from 'axios';
import {useState} from 'react';

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncMethod = async (
    asyncMethod: () => Promise<AxiosResponse<any, any>>,
    onSuccess: (result?: any) => Promise<void> | void,
    onError: (e?: any) => Promise<void> | void,
  ) => {
    try {
      setIsLoading(true);
      const result = await asyncMethod();
      setIsLoading(false);
      return await onSuccess(result);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      return onError(e);
    }
  };

  return {handleAsyncMethod, isLoading, setIsLoading};
};

export default useApi;
