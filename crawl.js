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


