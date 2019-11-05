console.time('Application time')
console.log("This is the lumograph initialize")

const Crawler = require('./build/crawler')
const crawler = new Crawler("./archive/rolls/");
// crawler.crawl();
// const fs = require("fs");
// for (let i = 0; i < 40; i++) {
//     const directory = "./archive/rolls/";
//     let index = i;
//     let rollType = ["Ektar","Fuji","Washi-S"];
//     let iso = [50,200,400,800,1600];
//     let rollSize = [35,120,200];

//     let dirName = 
//         index + "%" +
//         rollType[Math.floor(Math.random()*rollType.length)] + "%" +
//         iso[Math.floor(Math.random() * iso.length)] + "%" +
//         rollSize[Math.floor(Math.random() * rollSize.length)]
//     ;

//     if(!fs.existsSync(directory + dirName))
//     {
//         fs.mkdirSync(
//             directory + dirName
//         );
//     }
    
// }


console.timeEnd('Application time')