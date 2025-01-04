// import順序のテスト（simple-import-sort）
import { useCallback, useState } from 'react';
import type { FC } from 'react';

// 未使用importのテスト（unused-imports）
import { useEffect } from 'react';
import { z } from 'zod';

// TypeScriptの型定義
interface Props {
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

// React関数コンポーネント（react/react-in-jsx-scope: 'off'のテスト）
const TestComponent: FC<Props> = ({ initialCount = 0, onCountChange }) => {
  const [count, setCount] = useState(initialCount);
  
  // 未使用変数のテスト（unused-imports/no-unused-vars）
  const unusedVariable = 'test';
  
  // useEffectの依存配列テスト（react-hooks/exhaustive-deps）
  useEffect(() => {
    if (count !== initialCount) {
      onCountChange?.(count);
    }
  }, [count]); // 警告: 'initialCount'と'onCountChange'が依存配列に含まれていない

  // useCallbackテスト
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // 正しい依存配列

  // JSX accessibility（jsx-a11y）テスト
  return (
    <div>
      {/* jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div onClick={() => setCount(0)}>
        Reset Count
      </div>

      <p>Current count: {count}</p>

      {/* jsx-a11y/aria-role */}
      <div role="buttton" onClick={handleIncrement}>
        Increment
      </div>

      {/* アクセシビリティ対応の正しい実装 */}
      <button
        onClick={handleIncrement}
        aria-label="Increment counter"
      >
        Correct Button
      </button>
    </div>
  );
};

export default TestComponent;