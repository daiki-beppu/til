import { useEffect } from 'react';

export const useSetBgColor = () => {
  useEffect(() => {
    // alert('コンポーネントがマウントされました');
    // マウント時の処理
    document.body.style.backgroundColor = 'skyblue';

    // return 以降がアンマウント時の処理
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
};
