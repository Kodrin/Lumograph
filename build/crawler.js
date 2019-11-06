
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
    let rollList = "";
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
            const delimiter = "_";
            let unfiltered = src.replace(directory, "");
            let filtered = unfiltered.split(delimiter);
            let entry = "";

            let rollNumber = filtered[0];
            let rollType = filtered[1];
            let rollIso = filtered[2];
            let rollSize = filtered[3];

            const x = 30;
            
            
            let str = rollNumber + new Array(x - rollNumber.length + 1).join(' ') ;
                str += rollType + new Array(x - rollType.length + 1).join(' ') ;
                str += rollIso + new Array(x - rollIso.length + 1).join(' ') ;
                str += rollSize + new Array(x - rollSize.length + 1).join(' ') ;
                str += "\n";
                console.log(str);
                

                rollList += str;

                // console.log("Roll Nbr. " + filtered[0] + " ");
            // console.log(filtered);
        }
    }
    
    const x = 30;
    let header = [
        "NBR",
        "TYPE",
        "ISO",
        "SIZE"
    ]
    let spacer = "+".repeat(x*header.length);
        spacer += "\n";
        
    let col = header[0] + new Array(x - header[0].length + 1).join(' ');
        col += header[1] + new Array(x - header[1].length + 1).join(' ');
        col += header[2] + new Array(x - header[2].length + 1).join(' ');
        col += header[3] + new Array(x - header[3].length + 1).join(' ');
        col += "\n";
        col += spacer;
        
    // rollList = rollList.toString();
    
    fs.writeFileSync(databasePath + rollFile, col + rollList);
    

}

module.exports = Crawler