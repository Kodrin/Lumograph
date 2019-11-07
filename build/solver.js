function Solver()
{
    this.GenerateTestFolders = function(folderNumber)
    {
        const fs = require("fs");
        for (let i = 0; i < folderNumber; i++) 
        {
            const directory = "./archive/rolls/";
            let index = i;
            let rollType = ["Ektar","Fuji","Washi-S"];
            let iso = [50,200,400,800,1600];
            let rollSize = [35,120,200];
            
            let dirName = 
            index + "_" +
            rollType[Math.floor(Math.random()*rollType.length)] + "_" +
            iso[Math.floor(Math.random() * iso.length)] + "_" +
            rollSize[Math.floor(Math.random() * rollSize.length)];
        
            if(!fs.existsSync(directory + dirName))
            {
                fs.mkdirSync(
                    directory + dirName
                );
            }
        
        }
    }
}

module.exports = Solver