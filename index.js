console.time('Application time');
console.log("This is the lumograph initialize");

//namespacing
const Crawler = require('./build/crawler');
const Solver = require('./build/solver');

//instancing
const crawler = new Crawler("./archive/rolls/");
const solver = new Solver();


//main
crawler.CrawlRolls();


//debugger
// solver.GenerateTestFolder(40);


console.timeEnd('Application time');