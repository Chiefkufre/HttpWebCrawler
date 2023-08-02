import { normalizeURL } from './crawl.js';
import {sortPages} from './report.js';
import { test, expect } from '@jest/globals';


test("sortPages", () => {
    const input = {
        "https://wagslane.com":3
    }
    const actual = sortPages(input);
    const expected = [
        ["https://wagslane.com",3]
    ]
    expect(actual).toEqual(expected);
})