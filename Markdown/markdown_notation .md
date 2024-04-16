# 1. マークダウン記法

- [1. マークダウン記法](#1-マークダウン記法)
  - [1.1. VScode でのプレビュー](#11-vscode-でのプレビュー)
  - [1.2. 見出し heading \< h1~h4 \>](#12-見出し-heading--h1h4-)
- [2. 見出し 1](#2-見出し-1)
  - [2.1. 見出し 2](#21-見出し-2)
    - [2.1.1. 見出し 3](#211-見出し-3)
      - [2.1.1.1. 見出し 4](#2111-見出し-4)
  - [2.2. リスト unorder list \< ul \>](#22-リスト-unorder-list--ul-)
    - [2.2.1. 番号付きリスト order list \< ol \>](#221-番号付きリスト-order-list--ol-)
    - [2.2.2. 応用 : n から始まる番号付きリスト](#222-応用--n-から始まる番号付きリスト)
  - [2.3. 引用 quote \< backquote \>](#23-引用-quote--backquote-)
    - [2.3.1. 応用 : 二重引用](#231-応用--二重引用)
  - [2.4. 斜体 italic \< em \>](#24-斜体-italic--em-)
  - [2.5. 太字 bold \< strong \> | \< b \>](#25-太字-bold--strong----b-)
  - [2.6. コードブロック code borck \< pre \>](#26-コードブロック-code-borck--pre-)
  - [2.7. インラインコード code span \< code \>](#27-インラインコード-code-span--code-)
  - [打ち消し線 strike-through line \< strike \>](#打ち消し線-strike-through-line--strike-)
  - [リンク rink \< a \>](#リンク-rink--a-)
  - [チェックボックス chack box \< input type="checkbox" \>](#チェックボックス-chack-box--input-typecheckbox-)
  - [テーブル table \< table \>](#テーブル-table--table-)

## 1.1. VScode でのプレビュー

`[ ⌘ + K ]  → V`

## 1.2. 見出し heading < h1~h4 >

# 2. 見出し 1

## 2.1. 見出し 2

### 2.1.1. 見出し 3

#### 2.1.1.1. 見出し 4

```
記述例

# 見出し1
## 見出し2
### 見出し3
#### 見出し4

```

## 2.2. リスト unorder list < ul >

- foo
- var
  - foo var

```
記述例

- foo
- var
  - foo ver

```

### 2.2.1. 番号付きリスト order list < ol >

1. hoge
1. huga
   1. hoge huga

```
記述例

1. hoge
1. huga
  1. hoge huga
```

### 2.2.2. 応用 : n から始まる番号付きリスト

4. foo
1. ver
   1. foo ber

```
記述例

n. foo
1. ver
   1. foo ber

```

## 2.3. 引用 quote < backquote >

> 人はみな誰にも見せぬ自分を持っている
>
> 友人にも恋人にも家族にさえも
>
> 貼り付けた笑顔や虚勢で本音を隠し本性を隠しそうやって世界は
>
> かりそめの平穏を取り繕っている
>
> _引用元 : SPY×FAMILY_

```
記述例

> 人はみな誰にも見せぬ自分を持っている
>
> 友人にも恋人にも家族にさえも
>
> 貼り付けた笑顔や虚勢で本音を隠し本性を隠しそうやって世界は
>
> かりそめの平穏を取り繕っている

>*引用元 : SPY×FAMILY*
```

### 2.3.1. 応用 : 二重引用

> その日...世界中の人間は全て
>
> > 石になった！！
>
> _引用元 : Dr.STONE_

```
> その日...世界中の人間は全て
>
> > 石になった！！
>
> _引用元 : Dr.STONE_
```

## 2.4. 斜体 italic < em >

_螺旋丸_

_千鳥_

```
記述例

_螺旋丸_ or *螺旋丸*

_千鳥_ or *千鳥*

```

## 2.5. 太字 bold < strong > | < b >

**ゴムゴムの実**

**メラメラの実**

```
記述例

__ゴムゴムの実__ or **ゴムゴムの実**

__メラメラの実の実__ or **メラメラの実**

```

## 2.6. コードブロック code borck < pre >

```diff_ruby
def hello
  puts Hello_World
end

hello() # Hello_World
```

````
記述例
※記述の都合で"```"としているが本来は""は必要なし

"```"
def hello
  puts Hello_World
end

hello() # Hello_World
"```"
````

## 2.7. インラインコード code span < code >

ターミナルで
`echo "Hello World"`
と入力

```
記述例

ターミナルで
`echo "Hello World" `
と入力
```

## 打ち消し線 strike-through line < strike >

~~プログラミング難しい~~

```
記述例

~~プログラミング難しい~~

```

## リンク rink < a >

[ 別府 大貴の til リポジトリ ](https://github.com/daiki-beppu/til)

```
記述例

[ 別府 大貴の til リポジトリ ](https://github.com/daiki-beppu/til)

```

## チェックボックス chack box < input type="checkbox" >

- [x] ruby
- [ ] Java
- [x] JaveScript

```
記述例

- [x] ruby
- [ ] Java
- [x] JaveScript

```

## テーブル table < table >

| ID  | 名前 |
| --- | ---- |
| 1   | 別府 |
| 2   | 大貴 |

```
記述例

|ID|名前|
|-|-|
|1|別府|
|2|大貴|

```
