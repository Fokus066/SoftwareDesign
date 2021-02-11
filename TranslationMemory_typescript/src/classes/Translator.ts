import { Admin } from "./Admin";

export class Translator extends Admin{

    private _translatorname;
    private _translatorpassword;

   constructor(translatorname : String, translatorpassword: String){
   
    super(translatorname, translatorpassword);
    this._translatorname = translatorname;
    this._translatorpassword =translatorpassword;
    
   }
 
   public get translatorname(){
       return this._translatorname;

   }

   public get translatorpassword(){
       return this._translatorpassword;

   }

   public set translatorname(_translatorname ){
       
       this._translatorname =_translatorname ;

   }

   public set translatorpassword(_translatorpassword){
       
       this._translatorpassword = _translatorpassword;

   }
  

}

