import { JSDOM } from 'jsdom';


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


