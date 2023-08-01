import { normalizeURL } from './crawl.js';
import { test, expect } from '@jest/globals';


test("normalizeURL strip protocol", () => {
    const input = "https://example.com/hello";
    const actual = normalizeURL(input);
    const expected = "example.com/hello";
    expect(actual).toEqual(expected);
})

test("normalizeURL strip trailingSlash", () => {
    const input = "https://example.com/hello/";
    const actual = normalizeURL(input);
    const expected = "example.com/hello";
    expect(actual).toEqual(expected);
})

test("normalizeURL strip capital", () => {
    const input = "https://example.com/HELLO";
    const actual = normalizeURL(input);
    const expected = "example.com/hello";
    expect(actual).toEqual(expected);
})