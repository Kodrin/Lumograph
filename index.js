console.time('Application time')
console.log("This is the lumograph initialize")

const Crawler = require('./build/crawler')
const crawler = new Crawler("./archive/");
// crawler.crawl();


console.timeEnd('Application time')