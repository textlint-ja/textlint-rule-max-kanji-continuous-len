// LICENSE : MIT
"use strict";
import {RuleHelper} from "textlint-rule-helper";
import {matchCaptureGroupAll} from "match-index"

const KanjiRegExp = /((?:[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])+)/g;
const defaultOptions = {
    // 最大の漢字長
    // Allow max continuous length of kanji
    // If {current} > max(5), report Error.
    max: 5
};

module.exports = function reporter(context, options = defaultOptions) {
    const {Syntax, RuleError, report, fixer, getSource} = context;
    const helper = new RuleHelper(context);
    const maxLength = options.max || defaultOptions.max;
    return {
        [Syntax.Str](node){
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            const text = getSource(node);
            matchCaptureGroupAll(text, KanjiRegExp).forEach(({text, index}) => {
                // max より 大きい場合はエラー
                if (text.length > maxLength) {
                    const ruleError = new RuleError(`漢字が${maxLength + 1}つ以上連続しています: ${text}`, {
                        index
                    });
                    report(node, ruleError);
                }
            });
        }
    }
};