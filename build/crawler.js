
/*
 * CRAWLER IS FOR SEARCHING AND NAVIGATING FOLDER STRUCTURES
 * 
 */
    

function Crawler(directory)
{
    const fs = require("fs");
    const path = require('path');

    //directories
    const databasePath = "./build/database/";
    const rollFile = "roll.txt";

    let files = fs.readdirSync(directory); //read the directory
    let rollList = [];
    let indexCounter = 0;

    for (const file in files) {
        if (fs.statSync(directory + files[file]).isDirectory()) 
        {
            //THE NEW WAY (SPLITTING!!)
            /*****
             * [0] is the roll number
             * [1] is the roll type
             * [2] is the roll iso
             * [3] is the roll size (35mm, 120mm)
             *****
                */
            const src = directory + files[file];
            const delimiter = "%";
            let unfiltered = src.replace(directory, "");
            let filtered = unfiltered.split(delimiter);
            rollList.push(filtered);

            console.log("Roll Nbr. " + filtered[0] + " ");
            console.log(filtered);
        }
    }


    fs.writeFileSync(databasePath + rollFile, rollList);
    

}

module.exports = Crawler