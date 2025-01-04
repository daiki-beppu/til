import { useCallback, useEffect, useState } from 'react';

// TypeScript型定義
type Status = 'idle' | 'loading' | 'success' | 'error';
interface UseCustomHookOptions {
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

// カスタムフック
export function useCustomHook({
  initialValue = '',
  onValueChange,
}: UseCustomHookOptions = {}) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<Status>('idle');

  // 未使用の変数（unused-imports/no-unused-vars）
  const _unusedVar = 'test';

  // useEffect依存配列テスト（react-hooks/exhaustive-deps）
  useEffect(() => {
    if (value !== initialValue) {
      setStatus('success');
      onValueChange?.(value);
    }
  }, [value]); // 警告: 'initialValue'と'onValueChange'が依存配列に含まれていない

  // useCallbackテスト
  const handleUpdate = useCallback((newValue: string) => {
    setStatus('loading');
    setValue(newValue);
  }, []); // 依存配列は空で正しい

  const handleReset = useCallback(() => {
    setValue(initialValue);
    setStatus('idle');
  }, [initialValue]); // 正しい依存配列の使用

  return {
    value,
    status,
    handleUpdate,
    handleReset,
  };
}
