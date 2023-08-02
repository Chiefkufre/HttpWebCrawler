import { JSDOM } from 'jsdom';

export const crawlPage = async(baseURL, currentURl, pages) =>{ 
    let htmlBody = "";

    const baseURLObj = new URL(baseURL);
    const currentURlobj = new URL(currentURl)

    if (baseURLObj.hostname !== currentURlobj.hostname){
        return pages
    }
    let normalizedCurrentURL = normalizeURL(currentURl)
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`actively crawling: ${currentURl}`);


    try {
        const resp = await fetch(currentURl);

        if (resp.status > 399) {
            console.log(`error with status code ${resp.status} on page ${currentURl}`)
            return pages;
        }

        let contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`invalid content type. Type of ${contentType} return
            on page ${currentURl}`);
            return pages;
        }

        htmlBody = await resp.text();

        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL,nextURL,pages )
        }
    } catch (error) {
        console.log(`error during fetch: ${error.message}`)
    }
    return pages;
}

export const getURLsFromHTML = (htmlBody, baseURL) =>{
    let cleanBaseURL = baseURL.toLowerCase();
    const urls = []
    const dom = new JSDOM(htmlBody);
    const linksElements = dom.window.document.querySelectorAll('a');
    linksElements.forEach((element, key) => {
        if (element.href.startsWith('/')) {
            // relative url
            try {
                const urlObject = new URL(`${cleanBaseURL}${element.href.toLowerCase()}`)
                 urls.push(urlObject.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            // absolutes url
            try {
                const urlObject = new URL(element.href.toLowerCase())
                 urls.push(urlObject.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
        
    });
    return urls;
}


export const normalizeURL = (urlString) => {

    let lowerCaseURL = urlString.toLowerCase();
    const urlObject = new URL(lowerCaseURL);
    let normalizeString  = ""
    const hostPath = `${urlObject.host}${urlObject.pathname}`;
    if(hostPath.length > 0 && hostPath.endsWith("/")){
        normalizeString = hostPath.slice(0, -1);
    }else{
        normalizeString = hostPath;
    }
    return normalizeString;
}


