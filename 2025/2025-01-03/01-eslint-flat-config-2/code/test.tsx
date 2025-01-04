import React, { useEffect, useState } from 'react';

// コンポーネントの戻り値の型が明示されていない
export const Component = () => {
  // hooksルールの違反（条件付きでのフック使用）
  if (true) {
    const [state, setState] = useState(false);
  }

  // 不完全な依存配列
  useEffect(() => {
    console.log(state);
  }, []);

  return <div>Test Component</div>;
};
