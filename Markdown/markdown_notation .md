# マークダウン記法

---

## VScode でのプレビュー

`[ ⌘ + K ]  → V`

## 見出し heading < h1~h4 >

# 見出し 1

## 見出し 2

### 見出し 3

#### 見出し 4

```
記述例

# 見出し1
## 見出し2
### 見出し3
#### 見出し4

```

## リスト unorder list < ul >

- foo
- var
  - foo var

```
記述例

- foo
- var
  - foo ver

```

### 番号付きリスト order list < ol >

1. hoge
1. huga
   1. hoge huga

```
記述例

1. hoge
1. huga
  1. hoge huga
```

### 応用 : n から始まる番号付きリスト

4. foo
1. ver
   1. foo ber

```
記述例

n. foo
1. ver
   1. foo ber

```

## 引用 quote < backquote >

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

### 応用 : 二重引用

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

## 斜体 italic < em >

_螺旋丸_

_千鳥_

```
記述例

_螺旋丸_ or *螺旋丸*

_千鳥_ or *千鳥*

```

## 太字 bold < strong > | < b >

**ゴムゴムの実**

**メラメラの実**

```
記述例

__ゴムゴムの実__ or **ゴムゴムの実**

__メラメラの実の実__ or **メラメラの実**

```

## コードブロック code borck < pre >

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

## インラインコード code span < code >

ターミナルで
`echo "Hello World" `
と入力

```
記述例

ターミナルで
`echo "Hello World" `
と入力
```
