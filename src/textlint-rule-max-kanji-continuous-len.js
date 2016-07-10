// LICENSE : MIT
"use strict";
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index"

const KanjiRegExp = /((?:[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])+)/g;
const defaultOptions = {
    // 連続できる最大の文字数
    // If {current} > max(5), report Error.
    max: 5,
    // 許可する単語のリスト
    allow: []
};

module.exports = function reporter(context, options = defaultOptions) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper(context);
    const maxLength = options.max || defaultOptions.max;
    const allowWords = options.allow || defaultOptions.allow;
    return {
        [Syntax.Str](node){
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            const text = getSource(node);
            matchCaptureGroupAll(text, KanjiRegExp).forEach(({text, index}) => {
                    // max以下であるなら無視する
                    if (text.length <= maxLength) {
                        return;
                    }
                    // 辞書にある単語は無視する
                    if (allowWords.indexOf(text) !== -1) {
                        return;
                    }
                    // maxより長い場合はエラーとなる
                    const ruleError = new RuleError(`漢字が${maxLength + 1}つ以上連続しています: ${text}`, {
                        index
                    });
                    report(node, ruleError);
                }
            );
        }
    }
};