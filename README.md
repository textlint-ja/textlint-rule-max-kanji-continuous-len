# textlint-rule-max-kanji-continuous-len [![Build Status](https://travis-ci.org/textlint-ja/textlint-rule-max-kanji-continuous-len.svg?branch=master)](https://travis-ci.org/textlint-ja/textlint-rule-max-kanji-continuous-len) [![Gitter](https://badges.gitter.im/textlint-ja/textlint-ja.svg)](https://gitter.im/textlint-ja/textlint-ja)

[textlint](https://textlint.github.io/ "textlint") rule that limit max continuous length of kanji(漢字).

漢字が連続する最大文字数を制限する[textlint](https://textlint.github.io/ "textlint")ルールです。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-max-kanji-continuous-len

## Usage

Via `.textlintrc`(Recommended)


```json
{
    "rules": {
        "max-kanji-continuous-len": true
    }
}
```

Via CLI

```
textlint --rule max-kanji-continuous-len README.md
```

## Options

- `max`: `number`
    - default: 5
    - 連続できる漢字の文字数
    - `一二三四五六`は6文字なのでエラーとなります。
- `allow`: `string[]`
    - default: `[]`
    - 無視する単語の配列

```js
{
    "rules": {
        "max-kanji-continuous-len": {
            // 連続できる漢字の文字数
            // Allow max continuous length of kanji
            // If {current} > max(5), report Error.
            max: 5,
            // "倍精度浮動小数点数"という単語は例外として無視します
            allow: ["倍精度浮動小数点数"]
        }
    }
}
```

## Further Reading

デフォルト値である漢字の連続長が6文字以上だとエラーとする根拠は今のところありません。

> 漢字連続長はこの印象に影響が無かったことから、漢字連続長を短くすることで「子ども向けの文章」という印象を与えず、先行研究で指摘される読みやすい文章が実現できると示唆された。
> -- [日本心理学会第79回大会 漢字含有率と漢字連続長が文章の印象に与える影響](http://www.myschedule.jp/jpa2015/search/detail_program/id:602)

漢字が連続しすぎない方が、読みやすさに繋がることは既存研究にて実証されています。

おおまかに4文字と5文字に壁があり、そこにバッファをもたせて6文字以上は、デフォルトではエラーとしています。

- [日本心理学会第79回大会 漢字含有率と漢字連続長が文章の印象に与える影響](http://www.myschedule.jp/jpa2015/search/detail_program/id:602)
- [漢字含有率と漢字連続長が文章の印象に与える影響.pdf](http://www.myschedule.jp/jpa2015/img/figure/90737.pdf)
- [02Shibasaki.pdf](http://www.jels.info/REPL/02/02Shibasaki.pdf)
- [signl136.PDF - signl136-slides.pdf](http://www.nori.jp/publications/SIGNL136/signl136-slides.pdf)

"漢字"の範囲としては日本語における漢字ではなく、CJK統合漢字を含めた漢字を"漢字"として扱っています。

- [漢字にマッチする JavaScript の正規表現パターン: Days on the Moon](http://nanto.asablo.jp/blog/2015/12/31/7966713)
- [Unicodeで「漢字」の正規表現 | ものかの](http://tama-san.com/kanji-regex/)

## Changelog

See [Releases page](https://github.com/textlint-ja/textlint-rule-max-kanji-continuous-len/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.
For bugs and feature requests, [please create an issue](https://github.com/textlint-ja/textlint-rule-max-kanji-continuous-len/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](http://twitter.com/azu_re)

## License

MIT © azu
