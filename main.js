import { crawlPage, normalizeURL, getURLsFromHTML } from './crawl.js';
import { printReport } from './report.js';


async function main(){

    if (process.argv.length < 3) {
        console.log('No website provided');
        process.exit(1);
    } 
    if (process.argv.length > 3) {
        console.log('No Too many commannd line arguments passed');
        process.exit(1);
    } 
    const baseURL = process.argv[2];
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);
    return pages;
}

main();

