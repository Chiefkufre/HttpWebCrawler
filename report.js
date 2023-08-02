export const printReport = (pages) => {
    console.log("==============")
    console.log("REPORT")
    console.log("==============")
    const sortedPages = sortPages(pages)
    for(const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]

        let statement = "link"

        if(hits > 1){
            statement = "links"
        }
        console.log(`found ${hits} ${statement} to page: ${url}`)
    }
    console.log("==============")
    console.log("END OF REPORT")
    console.log("==============")
}
export const sortPages = (pages = {}) => {
  const pageArr = Object.entries(pages)
  pageArr.sort((a, b) => {
    return b[1] - a[1]
  })
  return pageArr;
}

