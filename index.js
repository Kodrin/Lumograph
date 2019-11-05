console.time('Application time')
console.log("This is the lumograph initialize")

const Crawler = require('./build/crawler')
const crawler = new Crawler("./archive/");


console.timeEnd('Application time')