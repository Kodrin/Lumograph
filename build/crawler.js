
/*
 * CRAWLER IS FOR SEARCHING AND NAVIGATING FOLDER STRUCTURES
 * 
 */


function Crawler()
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

    this.CrawlRolls = function (dir)
    {

        const files = fs.readdirSync(dir); //read the dir
        let rollList = [];
        let exposures = [];

        for (const file in files) 
        {
            if (fs.statSync(dir + files[file]).isDirectory()) 
            {
                //THE NEW WAY (SPLITTING!!)
                /*****
                 * [0] is the roll number
                 * [1] is the roll type
                 * [2] is the roll iso
                 * [3] is the roll size (35mm, 120mm)
                 *****
                    */
                const src = dir + files[file];

                //splits
                const unfiltered = src.replace(dir, "");
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

                const indexedRoll =
                {
                    index: rollNumber,
                    formattedString : str
                }

                rollList.push(indexedRoll);

                //recursion
                this.CrawlRolls(src + "/");
            }
            else
            {
                if(files != null)
                {
                    const src =  dir + files[file];
                    const unfiltered = src.replace(dir, "");
                    const filtered = unfiltered.split(".");
                    
                    const expName = filtered[0];
                    const expFormat = filtered[1];

                    let str = expName + new Array(columnLength - expName.length + 1).join(' ') ;
                        str += expFormat + new Array(columnLength - expFormat.length + 1).join(' ') ;
                        str += "\n";
                    
                    const indexedExposure =
                    {
                        index : filtered[0],
                        formattedString : str
                        
                    }
                    
                    exposures.push(indexedExposure);
                    // console.log(indexedExposure.index);
                }
                
            }
        }
        
        //recursion cancels out txt file
        if(files != null)
        {
            console.log(exposures.length);

            SortRolls(rollList);
            SortExposures(exposures);
            GenerateTable(databasePath + rollFile, TableHeader() + UnpackString(rollList));
            GenerateTable(databasePath + expFile, TableHeader() + UnpackString(exposures));
        }
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


    function SortRolls(rolls)
    {
        rolls.sort(function (a, b) 
        {
            return b.index - a.index;
        });    
        return rolls;        
    }

    function SortExposures(exp)
    {
        exp.sort(function (a, b) 
        {
            return b.index - a.index;
        });    
        return exp;        
    }

    function UnpackString(indexedData)
    {
        let temp = "";
        for (let i = 0; i < indexedData.length; i++) {
            temp += indexedData[i].formattedString;
        }
        return temp;
    }
    
    function GenerateTable(path, table)
    {
        fs.writeFileSync(path, table);
    }
    

}

module.exports = Crawler