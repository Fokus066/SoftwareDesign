import fs from 'fs';
import path from 'path';

export class FileHandler
 {
  constructor()
   {
   }

  public readJSON(pathToFile: string) : any 
  {
    let jsonRaw = fs.readFileSync(path.resolve(__dirname, '../'+pathToFile));
    let json : any = JSON.parse(jsonRaw.toString());
    return json;
  }

  public readArrayFile(pathToFile: string) : Array<any> 
  {
    return this.readJSON(pathToFile);
  }

  public readObjectFile(pathToFile: string) : any 
  {
    return this.readJSON(pathToFile);
  }

  public writeFile(pathToFile: string, dataToWrite: any) : void {

  fs.writeFileSync(path.resolve(__dirname, '../' + pathToFile), JSON.stringify(dataToWrite,null,2)); 

  }

  public deletefile(pathToFile: string): void {

    fs.stat(path.resolve(__dirname, '../' + pathToFile), function (err, stats) {
      
      console.log(stats);//here we got all information of file in stats variable
   
      if (err) {
          return console.error(err);
      }
   
      fs.unlink(path.resolve(__dirname, '../' + pathToFile),function(err){
           if(err) return console.log(err);
           console.log('file deleted successfully');
      });  
   });

  }
}