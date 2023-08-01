import { normalizeURL, getURLsFromHTML } from './crawl.js';
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

test("getURLsFromHTML absolute", () => {
    const inputHTMLBody = `
    <html>
        <head></head>
        <body>
            <ul>
            <li><a href="https://blog.boot.dev/music">Boot dev blog</a></li>
            </ul>
        </body>
    </html>`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL );
    const expected = ['https://blog.boot.dev/music'];
    expect(actual).toEqual(expected);
})


test("getURLsFromHTML relative", () => {
    const inputHTMLBody = `
    <html>
        <head></head>
        <body>
            <ul>
            <li><a href="/music">Boot dev blog</a></li>
            </ul>
        </body>
    </html>`
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL );
    const expected = ['https://blog.boot.dev/music'];
    expect(actual).toEqual(expected);
})

test("getURLsFromHTML relative, absolute, multiple URLS", () => {
    const inputHTMLBody = `
    <html>
        <head></head>
        <body>
            <ul>
            <li><a href="/VIDEO">Boot dev blog</a></li>
            <li><a href="https://blog.boot.dev/music">Boot dev blog</a></li>
            <li><a href="https://blog.boot.dev/music/jazz">Boot dev blog</a></li>
            </ul>
        </body>
    </html>`
    const inputBaseURL = "https://Blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL );
    const expected = ['https://blog.boot.dev/video', 'https://blog.boot.dev/music','https://blog.boot.dev/music/jazz'];
    expect(actual).toEqual(expected);
})

test("getURLsFromHTML invalidURL", () => {
    const inputHTMLBody = `
    <html>
        <head></head>
        <body>
            <ul>
            <li><a href="video">Boot dev blog</a></li>
            </ul>
        </body>
    </html>`
    const inputBaseURL = "https://Blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL );
    const expected = []
    expect(actual).toEqual(expected);
})