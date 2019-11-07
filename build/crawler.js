
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
    const rollFile = "rolls.txt";
    const expFile = "exposures.txt"
    const columnLength = 30;

    //delimiters
    const folderDelimiter = "_";
    
    this.CrawlRolls = function ()
    {

        const files = fs.readdirSync(directory); //read the directory
        let rollList = "";

        for (const file in files) 
        {
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

                //splits
                const unfiltered = src.replace(directory, "");
                const filtered = unfiltered.split(folderDelimiter);

                const rollNumber = filtered[0];
                const rollType = filtered[1];
                const rollIso = filtered[2];
                const rollSize = filtered[3];                
                
                let str = rollNumber + new Array(columnLength - rollNumber.length + 1).join(' ') ;
                    str += rollType + new Array(columnLength - rollType.length + 1).join(' ') ;
                    str += rollIso + new Array(columnLength - rollIso.length + 1).join(' ') ;
                    str += rollSize + new Array(columnLength - rollSize.length + 1).join(' ') ;
                    str += "\n";

                    rollList += str;
            }
        }

        GenerateTable(databasePath + rollFile, TableHeader() + rollList);
    }

    function TableHeader()
    {
        const header = [
            "NBR",
            "TYPE",
            "ISO",
            "SIZE"
        ]
        let spacer = "+".repeat(columnLength*header.length);
            spacer += "\n";
        
        let col = header[0] + new Array(columnLength - header[0].length + 1).join(' ');
            col += header[1] + new Array(columnLength - header[1].length + 1).join(' ');
            col += header[2] + new Array(columnLength - header[2].length + 1).join(' ');
            col += header[3] + new Array(columnLength - header[3].length + 1).join(' ');
            col += "\n";
            col += spacer;
        
        return col;
    }
    
    function GenerateTable(path, table)
    {
        fs.writeFileSync(path, table);
    }
    

}

module.exports = Crawler