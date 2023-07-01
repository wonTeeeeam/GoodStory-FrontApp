import React, {useState} from 'react';

function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncMethod = async (asyncMethod, onSuccess, onError) => {
    try {
      setIsLoading(true);
      const result = await asyncMethod();
      setIsLoading(false);
      return await onSuccess(result);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return onError(e);
    }
  };

  return {handleAsyncMethod, isLoading, setIsLoading};
}

export default useApi;
