// 未使用変数のテスト
const unusedVar = 'test';

// any型の使用テスト
const anyTest: any = 'test';

// アンダースコアで始まる未使用変数のテスト
function testFunction(_unusedParam: string) {
  return 'test';
}

// 型のないパラメータ
function noTypeFunction(param) {
  return param;
}

// import typeのテスト
import { String } from 'typescript';
