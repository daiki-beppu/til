# HTML について

詳しくは[MDN HTML を参照](https://developer.mozilla.org/ja/docs/Web/HTML)

## HTML とは

**Hyper Text Markup Language** の略
Web ページを表示するために用いられるマークアップ言語

本来は学術論文を電子化するために設計された言語

※ 厳密には HTML はマークアップ言語と呼ばれプログラミング言語とは異なる

### HTML の役割

web ページの構造やページ内の情報を構造化してコンピュータが構造を理解できるようにする役割を持つ
HTML タグを用いて見出しや段落リンクや画像などの構造を明確にする

CSS も同じマークアップ言語だが役割がそれぞれ違う
HTML は文章の骨格を作る
CSS は文章の装飾をする

### HTML タグ

- 見出し `<h1>,<h2>,<h3>,<h4>`
- 段落 `<p>`
- コンテンツ区分 `<div>`
- アンカーリンク `<a href "url" alt "画像の説明">`
- 画像 `<img src= "ファイル名">`
- フォーム `<from action="アクション名">`
- インプット `<input type="属性">`
- ボタン `<bottom>`
- テーブル

```
<table>
  <thead>
    <tr>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>土日祝以外</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
```
