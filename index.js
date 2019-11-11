console.time('Application time');
console.log("This is the lumograph initialize");

//namespacing
const Crawler = require('./build/crawler');
const Solver = require('./build/solver');

//instancing
const crawler = new Crawler();
const solver = new Solver();


//main
crawler.CrawlRolls("./archive/rolls/");


//debugger
// solver.GenerateTestFolder(40);


console.timeEnd('Application time');    