
/*
 * CRAWLER IS FOR SEARCHING AND NAVIGATING FOLDER STRUCTURES
 * 
 */
    

function Crawler(directory)
{
    const fs = require("fs");
    const path = require('path');

    let files = fs.readdirSync(directory); //read the directory
    let fileList = [];
    let indexCounter = 0;

    // this.crawl = function ()
    // {
        for (const file in files) {
            if (fs.statSync(directory + files[file]).isDirectory()) 
            {
                fileList = Crawler(directory + files[file] + '/', fileList); //continue recursion
            }
            else 
            {
                var src = directory + files[file]; //source of input files[file]
                var slicedExt = files[file].slice(0, -4); //remove extension
                var dst = __dirname + "/public/collections/"+ indexCounter + ".jpg"; //source of destination
                var pathName = path.basename(directory); //directory name
                var rollIndex = pathName.slice(0,2);
                var roll = pathName.slice(3,-4); //gets the name of the roll from directory
                var isometric = pathName.slice(-3); //gets the iso value of the roll
        
                console.log(src);
        
                indexCounter ++;
            }
            
        }
    // }
    

}

module.exports = Crawler