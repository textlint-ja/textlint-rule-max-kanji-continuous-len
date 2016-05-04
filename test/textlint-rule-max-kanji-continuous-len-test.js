const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-max-kanji-continuous-len";
// ruleName, rule, { valid, invalid }
tester.run("max-kanji-continuous-len", rule, {
    valid: [
        // no match
        "漢字",
        "漢字連続調",
        {
            text: "一二三四五六",
            options: {
                max: 6 // 6 is ok, 7 is ng
            }
        }
    ],
    invalid: [
        {
            text: "漢字連続調複雑性が高い",
            errors: [
                {
                    message: "漢字が6つ以上連続しています: 漢字連続調複雑性",
                    line: 1,
                    column: 1
                }
            ]
        },
        {
            text: `＃一二三四五六`,
            errors: [
                {
                    message: "漢字が6つ以上連続しています: 一二三四五六",
                    line: 1,
                    column: 2
                }
            ]
        },
        // multiple match in multiple lines
        {
            text: `一二三四五六です。一二三四五六です。`,
            errors: [
                {
                    message: "漢字が6つ以上連続しています: 一二三四五六",
                    line: 1,
                    column: 1
                },

                {
                    message: "漢字が6つ以上連続しています: 一二三四五六",
                    line: 1,
                    column: 10
                }
            ]
        },
        // multiple hit items in a line
        {
            text: `一二三四五六\n一二三四五六`,
            errors: [
                {
                    message: "漢字が6つ以上連続しています: 一二三四五六",
                    line: 1,
                    column: 1
                },

                {
                    message: "漢字が6つ以上連続しています: 一二三四五六",
                    line: 2,
                    column: 1
                }
            ]
        }
    ]
});